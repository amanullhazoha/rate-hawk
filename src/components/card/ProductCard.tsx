"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import Carousel from "react-multi-carousel";
import MapIcon from "@/assets/icons/MapIcon";
import StarIcon from "@/assets/icons/StarIcon";
import { RoomIcon } from "@/assets/ameniteIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import { useSearchParams } from "next/navigation";
import product_image from "@/assets/images/product.jpg";
import {
  useUserAddFavoriteMutation,
  useUserRemoveFavoriteMutation,
} from "@/view/save-list/slice";
import BreakfastIcon from "@/assets/icons/BreakfastIcon";

const responsive = {
  mobile: {
    breakpoint: { max: 20000, min: 0 },
    items: 1,
  },
};

const ProductCard = ({
  product,
  hotelData,
  favoriteData,
}: {
  product: any;
  hotelData: any;
  favoriteData: any;
}) => {
  const searchParams = useSearchParams();
  const [userAddFavorite] = useUserAddFavoriteMutation();
  const [userRemoveFavorite] = useUserRemoveFavoriteMutation();
  const data = hotelData?.find((item: any) => item.id === product.id);

  const isFavorite = favoriteData?.find(
    (item: any) => item?.hotel_id === product?.id
  )
    ? true
    : false;

  const handleFavorite = async ({
    hotel,
    hotel_id,
    isFavorite = false,
  }: {
    hotel: any;
    hotel_id: string;
    isFavorite: boolean;
  }) => {
    if (isFavorite) {
      const data: any = await userRemoveFavorite(hotel_id);

      if (data?.error) return toast.error(data?.error.data);

      toast.success("Remove Favorite successfully.");
    } else {
      const payload = {
        hotel: {
          hotel_id,
          kind: hotel?.kind,
          name: hotel?.name,
          images: hotel?.images,
          latitude: hotel?.latitude,
          longitude: hotel?.longitude,
          region_id: hotel?.region?.id,
          star_rating: hotel?.star_rating,
          region_name: hotel?.region?.name,
        },
        hotel_id,
      };

      const data: any = await userAddFavorite(payload);

      if (data?.error) return toast.error(data?.error.data);

      toast.success("Add Favorite successfully.");
    }
  };

  return (
    <div>
      {product && (
        <div className="rounded-[10px] relative">
          <div className="w-full">
            <Carousel responsive={responsive}>
              {product?.images?.length <= 0 ? (
                <Link
                  href={`/hotel-detail/${product?.id}${
                    searchParams.toString() ? `?${searchParams.toString()}` : ""
                  }`}
                  legacyBehavior
                >
                  <a target="_blank" rel="noopener noreferrer">
                    <div className="h-[200px] w-[200px]">
                      <Image
                        fill
                        src={product_image}
                        alt={product?.name}
                        className="h-full object-cover rounded-md"
                      />
                    </div>
                  </a>
                </Link>
              ) : (
                product?.images?.map((image: string) => (
                  <Link
                    key={image}
                    href={`/hotel-detail/${product?.id}${
                      searchParams.toString()
                        ? `?${searchParams.toString()}`
                        : ""
                    }`}
                    legacyBehavior
                  >
                    <a target="_blank" rel="noopener noreferrer">
                      <div className="h-[200px] w-full">
                        <Image
                          fill
                          alt={product?.name}
                          src={image.replace("{size}", "1024x768")}
                          className="h-full object-cover rounded-md"
                        />
                      </div>
                    </a>
                  </Link>
                ))
              )}
            </Carousel>
          </div>

          <div className="absolute top-3 flex justify-end items-center left-0 right-0">
            <span
              onClick={() =>
                handleFavorite({
                  isFavorite,
                  hotel: product,
                  hotel_id: product?.id,
                })
              }
              className={`w-8 h-8 rounded-full flex justify-center items-center mr-2 cursor-pointer ${
                isFavorite ? "bg-black-800" : "bg-black-400"
              }`}
            >
              <HeartIcon />
            </span>
          </div>
        </div>
      )}

      <Link
        // href={`/hotel-detail/test_hotel${
        href={`/hotel-detail/${product?.id}${
          searchParams.toString() ? `?${searchParams.toString()}` : ""
        }`}
        legacyBehavior
      >
        <a target="_blank" rel="noopener noreferrer">
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

            <p className="text-base font-semibold text-black-800 mb-2 truncate ">
              {product?.name}
            </p>

            <p className="flex gap-2 items-center text-text-blar text-sm font-medium">
              <MapIcon />
              {product?.region?.name}
            </p>

            <div className="h-[1px] bg-text-light w-14 my-2"></div>

            <div className="bg-bg-primary px-2 py-2 rounded-md mb-2">
              <p className="text-xs mb-1.5">
                {data?.rates[0]?.room_data_trans?.main_name}
              </p>

              <div className="flex flex-wrap gap-5">
                {data?.rates[0]?.rg_ext?.capacity > 0 && (
                  <p className="text-xs flex items-center gap-1 text-[#008900]">
                    <BreakfastIcon color="#008900" />
                    {data?.rates[0]?.rg_ext?.capacity}
                  </p>
                )}
                <p
                  className={`text-xs flex items-center gap-1 capitalize ${
                    data?.rates[0]?.meal !== "nomeal"
                      ? "text-[#008900]"
                      : "text-[#000000]"
                  }`}
                >
                  <BreakfastIcon
                    color={
                      data?.rates[0]?.meal !== "nomeal" ? "#008900" : "#000000"
                    }
                  />
                  {data?.rates[0]?.meal === "nomeal"
                    ? "No meals"
                    : data?.rates[0]?.meal?.replace(/-/g, " ")}
                </p>
              </div>

              <p
                className={`text-xs flex items-center gap-1 mt-1.5 ${
                  data?.rates[0]?.payment_options?.payment_types[0]
                    ?.cancellation_penalties?.free_cancellation_before
                    ? "text-[#008900]"
                    : "text-[#000000]"
                }`}
              >
                <BreakfastIcon
                  color={
                    data?.rates[0]?.payment_options?.payment_types[0]
                      ?.cancellation_penalties?.free_cancellation_before
                      ? "#008900"
                      : "#000000"
                  }
                />
                {data?.rates[0]?.payment_options?.payment_types[0]
                  ?.cancellation_penalties?.free_cancellation_before
                  ? "Free cancellation"
                  : "No free cancellation"}
              </p>
            </div>

            <div className="flex justify-between items-center">
              {data?.rates[0]?.daily_prices[0] ? (
                <p className="text-base font-medium text-black-800">
                  {/* {data?.rates[0]?.daily_prices[0]}{" "} */}
                  {(
                    Number(data?.rates[0]?.daily_prices[0]) +
                    Number(
                      data?.rates[0]?.payment_options?.payment_types?.[0]
                        ?.commission_info?.show?.amount_commission
                    ) /
                      data?.rates[0]?.daily_prices?.length
                  ).toFixed(2)}{" "}
                  {localStorage.getItem("currency")}{" "}
                  <span className="text-text-blar">/night</span>
                </p>
              ) : (
                <p className="bg-yellow-300 px-1 py-0.5 rounded-md text-text-blar">
                  Booked
                </p>
              )}

              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4" />
                <span>{product?.star_rating}</span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
