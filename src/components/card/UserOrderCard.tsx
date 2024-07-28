"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import Carousel from "react-multi-carousel";
import MapIcon from "@/assets/icons/MapIcon";
import StarIcon from "@/assets/icons/StarIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import { useSearchParams } from "next/navigation";
import product_image from "@/assets/images/product.jpg";
import { useUserRemoveFavoriteMutation } from "@/view/save-list/slice";

const responsive = {
  mobile: {
    breakpoint: { max: 20000, min: 0 },
    items: 1,
  },
};

const UserOrderCard = ({ order }: { order: any }) => {
  const searchParams = useSearchParams();

  return (
    <div>
      <div className="rounded-[10px] relative">
        <div className="w-full">
          <Carousel responsive={responsive}>
            {order?.images?.length <= 0 ? (
              <>
                <div className="h-[200px] w-[200px]">
                  <Image
                    fill
                    src={product_image}
                    alt={order?.hotel_name}
                    className="h-full object-cover rounded-md"
                  />
                </div>
              </>
            ) : (
              order?.images?.map((image: string) => (
                <div className="h-[200px] w-full" key={image}>
                  <Image
                    fill
                    alt={order?.hotel_name}
                    src={image.replace("{size}", "200x200")}
                    className="h-full object-cover rounded-md"
                  />
                </div>
              ))
            )}
          </Carousel>

          <div className="absolute top-3 flex justify-end items-center left-0 right-0">
            <span
              className={`w-fit px-2 py-1 rounded-full flex bg-black-800 justify-center items-center mr-2 cursor-pointer text-white`}
            >
              Pending
            </span>
          </div>
        </div>
      </div>

      <Link
        href={`/hotel-detail/test_hotel${
          searchParams.toString() ? `?${searchParams.toString()}` : ""
        }`}
        // href={`/hotel-detail/${favorite?.hotel_id}${
        //   searchParams.toString() ? `?${searchParams.toString()}` : ""
        // }`}
      >
        <div className="mt-3.5">
          <p className="text-base font-semibold text-black-800 mb-2 truncate">
            {order?.hotel_name}
          </p>

          <div className="h-[1px] bg-text-light w-14 my-2"></div>

          <div className="flex justify-between items-center">
            <p className="flex gap-2 items-center text-text-blar text-sm font-medium">
              <MapIcon />
              {order?.region_name}
            </p>

            <div className="flex items-center gap-1">
              <span>{order?.total_night} Night</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="flex gap-2 items-center text-text-blar text-sm font-medium">
              {order?.kind}
            </p>

            <div className="flex items-center gap-1">
              <span>
                {order?.total_amount} {order?.currency_code}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserOrderCard;
