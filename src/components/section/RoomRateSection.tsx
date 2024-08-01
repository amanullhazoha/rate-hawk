"use client";

import { useState } from "react";
import RoomCard from "../card/RoomCard";
import { useGetHotelPrebookHashMutation } from "@/view/hotel-detail/slice/hotel-detail.slice";

const RoomRateSection = ({
  bookHash,
  selectRoom,
  room_groups,
  setOriginalRoom,
  handleSelectRoom,
}: {
  bookHash: any;
  selectRoom: any;
  room_groups: any;
  setOriginalRoom: (room: any) => void;
  handleSelectRoom: (rate: any) => void;
}) => {
  const [increase, setIncrease] = useState(0);
  const [
    getHotelPrebookHash,
    { isLoading: isPrebookHashLoading, data: prebookHash },
  ] = useGetHotelPrebookHashMutation();

  const handlePrebookHashSearch = async () => {};

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 border border-border-primary rounded-[20px] mb-8">
      <div>
        <h3 className="text-2xl font-semibold text-black">Room Rates</h3>

        <p className="text-base font-normal text-text-blar mt-2.5">
          Prices may increase on weekends or holidays
        </p>

        <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>
      </div>

      <div className="flex gap-4 flex-col">
        {bookHash?.length > 0 &&
          room_groups?.map((room: any, index: any) => (
            <RoomCard
              room={room}
              key={index}
              images={room?.images}
              selectRoom={selectRoom}
              rates={bookHash[0]?.rates}
              handleSelectRoom={(value) => {
                setOriginalRoom(room);
                handleSelectRoom(value);
              }}
            />
          ))}
      </div>

      <h4 className="text-xl font-semibold text-black mt-4 border-t-border-primary pt-3">
        Prebook Rates
      </h4>

      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={increase <= 0 ? true : false}
            onClick={() => setIncrease((prev) => prev - 1)}
            className="bg-yellow-500 text-white px-2 py-2 rounded-md"
          >
            -
          </button>

          <p>{increase ? increase : "0"} %</p>

          <button
            type="button"
            disabled={increase <= 89 ? false : true}
            onClick={() => setIncrease((prev) => prev + 1)}
            className="bg-yellow-500 text-white px-2 py-2 rounded-md"
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      <div className="flex gap-4 flex-col mt-8">
        {bookHash?.length > 0 &&
          room_groups?.map((room: any, index: any) => (
            <RoomCard
              room={room}
              key={index}
              images={room?.images}
              selectRoom={selectRoom}
              rates={bookHash[0]?.rates}
              handleSelectRoom={(value) => {
                setOriginalRoom(room);
                handleSelectRoom(value);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default RoomRateSection;
