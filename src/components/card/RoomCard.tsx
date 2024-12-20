"use client";

import Image from "next/image";
import { parseISO, format } from "date-fns";
import Carousel from "react-multi-carousel";
import { useState, useEffect } from "react";
import { RoomIcon } from "@/assets/ameniteIcon";
// import GuestIcon from "@/assets/icons/GuestIcon";
import product from "@/assets/images/product.jpg";
// import RoundArrow from "@/assets/icons/RoundArrow";
// import BreakfastIcon from "@/assets/icons/BreakfastIcon";
import { localTimeConverter } from "@/lib/localTimeConverter";

import GuestIcon from "@/assets/icons/GuestIcon";
import BreakfastIcon from "@/assets/icons/BreakfastIcon";
import RoundArrow from "@/assets/icons/RoundArrow";

const responsive = {
  mobile: {
    breakpoint: { max: 20000, min: 0 },
    items: 1,
  },
};

const RoomCard = ({
  room,
  rates,
  images,
  selectRoom,
  handlePrebook,
  prebook = false,
  handleSelectRoom,
}: {
  room: any;
  rates: any;
  images: any;
  selectRoom: any;
  prebook?: boolean;
  handleSelectRoom: (rate: any) => void;
  handlePrebook?: (book_hash: any) => void;
}) => {
  const [productImage, setProductImage] = useState([]);

  const findDailyPrice = (allRates: any) => {
    const hotelRate = allRates?.find((item: any) =>
      room?.name?.includes(item?.room_data_trans?.main_name)
    );

    const dailyRate = (
      Number(hotelRate?.daily_prices[0]) +
      Number(
        hotelRate?.payment_options?.payment_types?.[0]?.commission_info?.show
          ?.amount_commission
      ) /
        hotelRate?.daily_prices?.length
    ).toFixed(2);

    return dailyRate;
  };

  useEffect(() => {
    if (images?.length > 0) {
      const newImages: any = images.map((image: string) =>
        image.replace("{size}", "1024x768")
      );

      setProductImage(newImages);
    }
  }, [images]);

  return (
    <div
      className={`p-3.5 rounded-md bg-bg-primary ${
        rates?.find((item: any) =>
          room?.name?.includes(item?.room_data_trans?.main_name)
        )?.daily_prices[0]
          ? "grid grid-cols-3 gap-4"
          : "hidden"
      }`}
    >
      <div className="w-full md:w-[200px] col-span-3 md:col-span-1">
        <Carousel responsive={responsive}>
          {productImage?.length <= 0 ? (
            <>
              <div className="h-[200px] w-[200px]">
                <Image
                  fill
                  src={product}
                  alt={room?.name}
                  className="h-full object-cover rounded-md"
                />
              </div>
            </>
          ) : (
            productImage?.map((image: string) => (
              <div className="h-[200px] w-[200px]" key={image}>
                <Image
                  fill
                  src={image}
                  alt={room?.name}
                  className="h-full object-cover rounded-md"
                />
              </div>
            ))
          )}
        </Carousel>
      </div>

      <div className="col-span-3 md:col-span-2 md:ml-3">
        <div className="flex flex-col gap-4 md:gap-0 justify-between h-full">
          <div>
            <h4>{room?.name}</h4>

            <div className="flex items-center flex-wrap gap-4 mt-2">
              {room?.rg_ext?.balcony > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">
                    {room?.rg_ext?.balcony} balcony
                  </p>
                </div>
              )}

              {room?.rg_ext?.bathroom > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">
                    {room?.rg_ext?.bathroom} bathroom
                  </p>
                </div>
              )}

              {room?.rg_ext?.bedding > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">
                    {room?.rg_ext?.bedding} bedding
                  </p>
                </div>
              )}

              {room?.rg_ext?.bedrooms > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">
                    {room?.rg_ext?.bedrooms} bedrooms
                  </p>
                </div>
              )}

              {room?.rg_ext?.capacity > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">
                    {room?.rg_ext?.capacity} capacity
                  </p>
                </div>
              )}

              {room?.rg_ext?.class > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">
                    {room?.rg_ext?.class} class
                  </p>
                </div>
              )}

              {room?.rg_ext?.club > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">
                    {room?.rg_ext?.club} club
                  </p>
                </div>
              )}

              {room?.rg_ext?.family > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">
                    {room?.rg_ext?.family} family
                  </p>
                </div>
              )}

              {room?.rg_ext?.floor > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">
                    {room?.rg_ext?.floor} floor
                  </p>
                </div>
              )}

              {room?.rg_ext?.quality > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">
                    {room?.rg_ext?.quality} quality
                  </p>
                </div>
              )}

              {room?.rg_ext?.capacity > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">
                    {room?.rg_ext?.capacity} capacity
                  </p>
                </div>
              )}

              {room?.rg_ext?.sex > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">{room?.rg_ext?.sex} sex</p>
                </div>
              )}

              {room?.rg_ext?.view > 0 && (
                <div className="flex items-center gap-3">
                  <RoomIcon />

                  <p className="text-sm font-medium">
                    {room?.rg_ext?.view} view
                  </p>
                </div>
              )}
            </div>
            {/* 
            <div className="bg-bg-primary px-2 py-2 rounded-md mb-2">
              <p className="text-xs mb-1.5">
                {room?.room_data_trans?.main_name}
              </p>

              {console.log(room)}

              <div className="flex flex-wrap gap-5">
                {room?.rates?.[0]?.rg_ext?.capacity > 0 && (
                  <p className="text-xs flex items-center gap-1 text-[#008900]">
                    <GuestIcon color="#008900" />
                    {room?.rates?.[0]?.rg_ext?.capacity}
                  </p>
                )}
                <p
                  className={`text-xs flex items-center gap-1 capitalize ${
                    room?.rates?.[0]?.meal !== "nomeal"
                      ? "text-[#008900]"
                      : "text-[#000000]"
                  }`}
                >
                  <BreakfastIcon
                    color={
                      room?.rates?.[0]?.meal !== "nomeal"
                        ? "#008900"
                        : "#000000"
                    }
                  />
                  {room?.rates?.[0]?.meal === "nomeal"
                    ? "No meals"
                    : room?.rates?.[0]?.meal?.replace(/-/g, " ")}
                </p>
              </div>

              <p
                className={`text-xs flex items-center gap-1 mt-1.5 ${
                  room?.rates?.[0]?.payment_options?.payment_types[0]
                    ?.cancellation_penalties?.free_cancellation_before
                    ? "text-[#008900]"
                    : "text-[#000000]"
                }`}
              >
                <RoundArrow
                  color={
                    room?.rates?.[0]?.payment_options?.payment_types?.[0]
                      ?.cancellation_penalties?.free_cancellation_before
                      ? "#008900"
                      : "#000000"
                  }
                />
                {room?.rates?.[0]?.payment_options?.payment_types?.[0]
                  ?.cancellation_penalties?.free_cancellation_before
                  ? "Free cancellation"
                  : "No free cancellation"}
              </p>
            </div> */}
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-5">
              {rates?.find((item: any) =>
                room?.name?.includes(item?.room_data_trans?.main_name)
              )?.rg_ext?.capacity > 0 && (
                <p className="text-xs flex items-center gap-1 text-[#008900]">
                  <GuestIcon color="#008900" />
                  {
                    rates?.find((item: any) =>
                      room?.name?.includes(item?.room_data_trans?.main_name)
                    )?.rg_ext?.capacity
                  }
                </p>
              )}
              <p
                className={`text-xs flex items-center gap-1 capitalize ${
                  rates?.find((item: any) =>
                    room?.name?.includes(item?.room_data_trans?.main_name)
                  )?.meal !== "nomeal"
                    ? "text-[#008900]"
                    : "text-[#000000]"
                }`}
              >
                <BreakfastIcon
                  color={
                    rates?.find((item: any) =>
                      room?.name?.includes(item?.room_data_trans?.main_name)
                    )?.meal !== "nomeal"
                      ? "#008900"
                      : "#000000"
                  }
                />
                {rates?.find((item: any) =>
                  room?.name?.includes(item?.room_data_trans?.main_name)
                )?.meal === "nomeal"
                  ? "No meals"
                  : rates
                      ?.find((item: any) =>
                        room?.name?.includes(item?.room_data_trans?.main_name)
                      )
                      ?.meal?.replace(/-/g, " ")}
              </p>
            </div>

            <p
              className={`text-xs flex items-center gap-1 mt-1.5 ${
                rates?.find((item: any) =>
                  room?.name?.includes(item?.room_data_trans?.main_name)
                )?.payment_options?.payment_types[0]?.cancellation_penalties
                  ?.free_cancellation_before
                  ? "text-[#008900]"
                  : "text-[#000000]"
              }`}
            >
              <RoundArrow
                color={
                  rates?.find((item: any) =>
                    room?.name?.includes(item?.room_data_trans?.main_name)
                  )?.payment_options?.payment_types[0]?.cancellation_penalties
                    ?.free_cancellation_before
                    ? "#008900"
                    : "#000000"
                }
              />
              {rates?.find((item: any) =>
                room?.name?.includes(item?.room_data_trans?.main_name)
              )?.payment_options?.payment_types[0]?.cancellation_penalties
                ?.free_cancellation_before
                ? `Free cancellation before ${localTimeConverter(
                    rates?.find((item: any) =>
                      room?.name?.includes(item?.room_data_trans?.main_name)
                    )?.payment_options?.payment_types[0]?.cancellation_penalties
                      ?.free_cancellation_before
                  )}`
                : "No free cancellation"}
            </p>
          </div>

          {/* {rates?.find((item: any) =>
            room?.name?.includes(item?.room_data_trans?.main_name)
          )?.payment_options?.payment_types?.[0]?.cancellation_penalties
            ?.free_cancellation_before && (
            <div className="w-full flex items-center justify-end">
              <div>
                <p className="text-xs text-black">
                  Free Cancellation Before
                  <span className="bg-yellow-300 px-1">
                    {localTimeConverter(
                      rates?.find((item: any) =>
                        room?.name?.includes(item?.room_data_trans?.main_name)
                      )?.payment_options?.payment_types[0]
                        ?.cancellation_penalties?.free_cancellation_before
                    )}
                  </span>
                </p>
              </div>
            </div>
          )} */}

          <div className="w-full flex items-center justify-end">
            <div>
              <p className="text-xl font-medium text-black">
                {localStorage.getItem("currency")}{" "}
                {/* {
                  rates?.find((item: any) =>
                    room?.name?.includes(item?.room_data_trans?.main_name),
                  )?.daily_prices[0]
                } */}
                {findDailyPrice(rates)}
                <sub className="text-sm font-normal text-black-400">
                  {" "}
                  /night
                </sub>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-t justify-end">
            {/* {prebook && (
              <button
                type="button"
                onClick={() => {
                  const find = rates?.find((item: any) =>
                    room?.name?.includes(item?.room_data_trans?.main_name),
                  );

                  handlePrebook?.(find?.book_hash);
                }}
                className="px-10 py-2 rounded-md bg-yellow-50"
              >
                Prebook
              </button>
            )} */}

            <button
              type="button"
              onClick={() =>
                handleSelectRoom({
                  ...rates?.find((item: any) =>
                    room?.name?.includes(item?.room_data_trans?.main_name)
                  ),
                  room_group_id: room?.room_group_id,
                })
              }
              className="px-10 py-2 rounded-md bg-primary-color"
            >
              {room?.room_group_id === selectRoom?.room_group_id
                ? "Selected"
                : "Select"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
