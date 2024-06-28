"use client";

import Link from "next/link";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import MapIcon from "@/assets/icons/MapIcon";
import StarIcon from "@/assets/icons/StarIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import product_image from "@/assets/images/product.jpg";

const responsive = {
  mobile: {
    breakpoint: { max: 20000, min: 0 },
    items: 1,
  },
};

const ProductCard = ({
  product,
  hotelData,
}: {
  product: any;
  hotelData: any;
}) => {
  const data = hotelData?.find((item: any) => item.hotel_id === product.id);

  return (
    <div>
      {/* <div className="rounded-[10px] relative">
        <Image src={product_image} alt="image" className="w-full" />

        <div className="absolute top-3 flex justify-between items-center left-0 right-0">
          <p className="bg-primary-color text-white text-xs font-medium px-2 rounded-r-[10px] py-1">
            -10% today
          </p>

          <span className="w-8 h-8 rounded-full bg-black-400 flex justify-center items-center mr-2">
            <HeartIcon />
          </span>
        </div>
      </div> */}

      {data && (
        <div className="rounded-[10px] relative">
          <div className="w-full">
            <Carousel responsive={responsive}>
              {data?.images?.length <= 0 ? (
                <>
                  <div className="h-[200px] w-[200px]">
                    <Image
                      fill
                      src={product_image}
                      alt={product?.name}
                      className="h-full object-cover rounded-md"
                    />
                  </div>
                </>
              ) : (
                data?.images?.map((image: string) => (
                  <div className="h-[200px] w-full">
                    <Image
                      fill
                      alt={product?.name}
                      src={image.replace("{size}", "200x200")}
                      className="h-full object-cover rounded-md"
                    />
                  </div>
                ))
              )}
            </Carousel>
          </div>

          <div className="absolute top-3 flex justify-end items-center left-0 right-0">
            <span className="w-8 h-8 rounded-full bg-black-400 flex justify-center items-center mr-2">
              <HeartIcon />
            </span>
          </div>
        </div>
      )}

      <Link href="/hotel-detail">
        <div className="mt-3.5">
          <div className="flex items-center gap-1 mb-2 text-sm font-medium text-text-blar">
            <span>Entire cabin</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="2"
              viewBox="0 0 2 2"
              fill="none"
            >
              <circle cx="1" cy="1" r="1" fill="#6B7280" />
            </svg>
            <span>{product?.rates?.length} beds</span>
          </div>

          <p className="text-base font-semibold text-black-800 mb-2">
            {data?.hotel_name}
          </p>

          <p className="flex gap-2 items-center text-text-blar text-sm font-medium">
            <MapIcon />
            {data?.region_name}
          </p>

          <div className="h-[1px] bg-text-light w-14 my-2"></div>

          <div className="flex justify-between items-center">
            <p className="text-base font-medium text-black-800">
              ${product?.rates[0]?.daily_prices[0]}{" "}
              <span className="text-text-blar">/night</span>
            </p>

            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4" />
              <span>{data?.star_rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
