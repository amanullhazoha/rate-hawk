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

const FavoriteProductCard = ({ favorite }: { favorite: any }) => {
  const searchParams = useSearchParams();
  const [userRemoveFavorite] = useUserRemoveFavoriteMutation();

  const handleRemoveFavorite = async (hotel_id: string) => {
    const data: any = await userRemoveFavorite(hotel_id);

    if (data?.isError) return toast.error("Not remove favorite.");

    toast.success("Remove Favorite successfully.");
  };

  return (
    <div>
      <div className="rounded-[10px] relative">
        <div className="w-full">
          <Carousel responsive={responsive}>
            {favorite?.hotel?.images?.length <= 0 ? (
              <>
                <div className="h-[200px] w-[200px]">
                  <Image
                    fill
                    src={product_image}
                    alt={favorite?.hotel?.name}
                    className="h-full object-cover rounded-md"
                  />
                </div>
              </>
            ) : (
              favorite?.hotel?.images?.map((image: string) => (
                <div className="h-[200px] w-full" key={image}>
                  <Image
                    fill
                    alt={favorite?.hotel?.name}
                    src={image.replace("{size}", "200x200")}
                    className="h-full object-cover rounded-md"
                  />
                </div>
              ))
            )}
          </Carousel>
        </div>

        <div className="absolute top-3 flex justify-end items-center left-0 right-0">
          <span
            onClick={() => handleRemoveFavorite(favorite?.hotel_id)}
            className={`w-8 h-8 rounded-full flex bg-black-800 justify-center items-center mr-2 cursor-pointer`}
          >
            <HeartIcon />
          </span>
        </div>
      </div>

      <Link
        href={`/hotel-detail/${favorite?.hotel_id}${
          searchParams.toString() ? `?${searchParams.toString()}` : ""
        }`}
      >
        <div className="mt-3.5">
          {/* <div className="flex items-center gap-1 mb-2 text-sm font-medium text-text-blar">
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
          </div> */}

          <p className="text-base font-semibold text-black-800 mb-2">
            {favorite?.hotel?.hotel_name}
          </p>

          {/* <p className="flex gap-2 items-center text-text-blar text-sm font-medium">
            <MapIcon />
            {favorite?.hotel?.region_name}
          </p> */}

          <div className="h-[1px] bg-text-light w-14 my-2"></div>

          <div className="flex justify-between items-center">
            <p className="flex gap-2 items-center text-text-blar text-sm font-medium">
              <MapIcon />
              {favorite?.hotel?.region_name}
            </p>

            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4" />
              <span>{favorite?.hotel?.star_rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FavoriteProductCard;
