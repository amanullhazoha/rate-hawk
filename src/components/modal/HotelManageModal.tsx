"use client";

import { useCallback, useRef, useState } from "react";
import {
  useDeleteHotelDumpDataMutation,
  useUploadHotelJsonDataMutation,
  useDownloadHotelDumpDataMutation,
} from "@/view/admin/slice";
import { toast } from "react-toastify";

const HotelManageModal = ({
  handleClose,
  total_hotel,
}: {
  total_hotel: string;
  handleClose: () => void;
  handleOpenForm?: () => void;
  handleCSVfileUpload?: (data: any) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadPercent, setUploadPercent] = useState(0);

  const [downloadHotelDumpData, { isLoading: downloadLoading }] =
    useDownloadHotelDumpDataMutation();
  const [uploadHotelJsonData, { isLoading: uploadLoading }] =
    useUploadHotelJsonDataMutation();
  const [deleteHotelDumpData, { isLoading: deleteDataLoading }] =
    useDeleteHotelDumpDataMutation();

  const handleDownloadDumpData = async () => {
    const download = await downloadHotelDumpData("");

    if (download?.data?.code === 200) {
      window.open(download?.data?.data?.data?.url, "_blank");
      handleClose();
    }
  };

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    const CHUNK_SIZE = 20 * 1024 * 1024;

    const textDecoder = new TextDecoder("utf-8");

    let offset = 0;
    let lineBuffer = "";
    const fileSize = file.size;

    while (offset < fileSize) {
      const chunk: any = await readChunk(file, offset, CHUNK_SIZE);
      offset += CHUNK_SIZE;

      console.log(offset, fileSize);

      setUploadPercent((100 / fileSize) * offset);

      const text = textDecoder.decode(chunk, { stream: true });

      lineBuffer += text;

      const lines = lineBuffer.split("\n");

      lineBuffer = lines.pop() || "";

      const mappedLines = lines.map((line) => JSON.parse(line));

      await uploadHotelJsonData({ hotels: mappedLines });
    }

    if (lineBuffer.length > 0) {
      const jsonObj = JSON.parse(lineBuffer);
      const mappedLine = jsonObj;

      await uploadHotelJsonData({ hotels: [mappedLine] });
    }

    console.log("File processing complete");
    toast.success("Dump data upload completed.");
  };

  const readChunk = (file: any, start: any, length: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const blob = file.slice(start, start + length);

      reader.onload = (e: any) => resolve(new Uint8Array(e.target.result));
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  };

  const handleDataDelete = async () => {
    try {
      const data = await deleteHotelDumpData("");

      handleClose();

      toast.success("Dump data delete successfully.");
    } catch (error) {
      console.log(error);

      toast.error("Dump data not deleted.");
    }
  };

  const handleClick = useCallback((): void => {
    if (inputRef.current) {
      inputRef.current.click();
      // handleClose();
    }
  }, []);

  return (
    <div className="bg-black bg-opacity-10 absolute top-0 left-0 right-0 bottom-0 z-40 flex items-center justify-center">
      <div className="container mx-auto px-1.5 flex justify-center">
        <div className="px-4 py-4 bg-white rounded-[10px] shadow-modal w-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-text-tertiary ">
              Manage Hotel
            </h3>

            <button type="button" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.16992 14.8299L14.8299 9.16992"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.8299 14.8299L9.16992 9.16992"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center flex-col gap-3">
            <button
              type="button"
              disabled={downloadLoading}
              onClick={handleDownloadDumpData}
              className="py-2.5 w-full rounded-lg bg-border-primary text-text-primary text-base font-medium"
            >
              Download Hotel Dump Data
            </button>

            <div>
              <button
                type="button"
                onClick={handleClick}
                disabled={
                  Number(total_hotel) <= 0 ? false : true || uploadLoading
                }
                className="py-2.5 w-full rounded-lg bg-green-700 text-white text-base font-medium"
              >
                {uploadLoading
                  ? `Uploaded ${uploadPercent.toFixed(2)}% of 100%`
                  : "Upload Hotel JSON Data"}
              </button>

              <input
                hidden
                type="file"
                name="file"
                accept=".jsonl"
                ref={inputRef}
                onChange={handleFileUpload}
              />
            </div>

            <button
              type="button"
              onClick={handleDataDelete}
              disabled={
                Number(total_hotel) > 0 ? false : true || deleteDataLoading
              }
              className="py-2.5 w-full rounded-lg bg-red-500 text-white text-base font-medium"
            >
              Delete All Hotel Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelManageModal;
