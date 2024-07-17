"use client";
import { useCallback, useRef, useState } from "react";

const HotelManageModal = ({
  handleClose,
}: {
  handleClose: () => void;
  handleOpenForm?: () => void;
  handleCSVfileUpload?: (data: any) => void;
}) => {
  const [fieldValue, setFieldValue] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    // Do something with the selected file
    console.log("Selected file:", file);
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
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
              onClick={handleClick}
              className="py-2.5 w-full rounded-lg bg-border-primary text-text-primary text-base font-medium"
            >
              Upload Json File
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
        </div>
      </div>
    </div>
  );
};

export default HotelManageModal;
