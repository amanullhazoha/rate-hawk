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
import {
  useUserAddFavoriteMutation,
  useUserRemoveFavoriteMutation,
} from "@/view/save-list/slice";

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
    (item: any) => item?.hotel_id === product?.id,
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
        hotel,
        hotel_id,
      };

      const data: any = await userAddFavorite(payload);

      if (data?.error) return toast.error(data?.error.data);

      toast.success("Add Favorite successfully.");
    }
  };

  console.log(data);

  return (
    <div>
      {product && (
        <div className="rounded-[10px] relative">
          <div className="w-full">
            <Carousel responsive={responsive}>
              {product?.images?.length <= 0 ? (
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
                product?.images?.map((image: string) => (
                  <div className="h-[200px] w-full" key={image}>
                    <Image
                      fill
                      alt={product?.name}
                      src={image.replace("{size}", "1024x768")}
                      className="h-full object-cover rounded-md"
                    />
                  </div>
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
        // href={`/hotel-detail/${product?.id}${
        href={`/hotel-detail/test_hotel${
          searchParams.toString() ? `?${searchParams.toString()}` : ""
        }`}
      >
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

          <div className="flex justify-between items-center">
            {data?.rates[0]?.daily_prices[0] ? (
              <p className="text-base font-medium text-black-800">
                {data?.rates[0]?.daily_prices[0]}{" "}
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
      </Link>
    </div>
  );
};

export default ProductCard;
