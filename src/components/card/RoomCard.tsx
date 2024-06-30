"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import { useState, useEffect } from "react";
import product from "@/assets/images/product.jpg";
import PeopleIcon from "@/assets/icons/PeopleIcon";

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
  handleSelectRoom,
}: {
  room: any;
  rates: any;
  images: any;
  handleSelectRoom: (rate: any) => void;
}) => {
  const [productImage, setProductImage] = useState([]);

  useEffect(() => {
    if (images?.length > 0) {
      const newImages = images.map((image: string) =>
        image.replace("{size}", "200x200"),
      );

      setProductImage(newImages);
    }
  }, [images]);

  return (
    <div
      className={`p-3.5 rounded-md gap-4 bg-bg-primary ${
        rates?.find((item: any) =>
          room?.name?.includes(item?.room_data_trans?.main_name),
        )?.daily_prices[0]
          ? "flex"
          : "hidden"
      }`}
    >
      <div className="w-[200px]">
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

      <div className="flex flex-col justify-between">
        <div>
          <h4>{room?.name}</h4>

          <div className="flex items-center flex-wrap gap-4 mt-2">
            {room?.rg_ext?.balcony > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">
                  {room?.rg_ext?.balcony} balcony
                </p>
              </div>
            )}

            {room?.rg_ext?.bathroom > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">
                  {room?.rg_ext?.bathroom} bathroom
                </p>
              </div>
            )}

            {room?.rg_ext?.bedding > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">
                  {room?.rg_ext?.bedding} bedding
                </p>
              </div>
            )}

            {room?.rg_ext?.bedrooms > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">
                  {room?.rg_ext?.bedrooms} bedrooms
                </p>
              </div>
            )}

            {room?.rg_ext?.capacity > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">
                  {room?.rg_ext?.capacity} capacity
                </p>
              </div>
            )}

            {room?.rg_ext?.class > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">
                  {room?.rg_ext?.class} class
                </p>
              </div>
            )}

            {room?.rg_ext?.club > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">{room?.rg_ext?.club} club</p>
              </div>
            )}

            {room?.rg_ext?.family > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">
                  {room?.rg_ext?.family} family
                </p>
              </div>
            )}

            {room?.rg_ext?.floor > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">
                  {room?.rg_ext?.floor} floor
                </p>
              </div>
            )}

            {room?.rg_ext?.quality > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">
                  {room?.rg_ext?.quality} quality
                </p>
              </div>
            )}

            {room?.rg_ext?.capacity > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">
                  {room?.rg_ext?.capacity} capacity
                </p>
              </div>
            )}

            {room?.rg_ext?.sex > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">{room?.rg_ext?.sex} sex</p>
              </div>
            )}

            {room?.rg_ext?.view > 0 && (
              <div className="flex items-center gap-3">
                <PeopleIcon />

                <p className="text-sm font-medium">{room?.rg_ext?.view} view</p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div>
            <p className="text-xl font-medium text-black">
              $
              {
                rates?.find((item: any) =>
                  room?.name?.includes(item?.room_data_trans?.main_name),
                )?.daily_prices[0]
              }
              <sub className="text-sm font-normal text-black-400"> /night</sub>
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              handleSelectRoom(
                rates?.find((item: any) =>
                  room?.name?.includes(item?.room_data_trans?.main_name),
                ),
              )
            }
            className="px-10 py-2 rounded-md bg-primary-color"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
