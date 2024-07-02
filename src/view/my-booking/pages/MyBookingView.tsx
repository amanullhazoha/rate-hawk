"use client";

import Link from "next/link";
import Image from "next/image";
import team from "@/assets/images/team.jpg";
import { usePathname } from "next/navigation";
import StarIcon from "@/assets/icons/StarIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import ProductCard from "@/components/card/ProductCard";
import TwitterIcon from "@/assets/icons/social/TwitterIcon";
import FacebookIcon from "@/assets/icons/social/FacebookIcon";
import LinkedInIcon from "@/assets/icons/social/LinkedInIcon";
import InstagramIcon from "@/assets/icons/social/InstagramIcon";
import PinterestIcon from "@/assets/icons/social/PinterestIcon";
import { useGetUserAllSaveListQuery } from "@/view/save-list/slice";
import FavoriteProductCard from "@/components/card/FavoriteProductCard";

const MyBookingView = () => {
  const { data, isLoading, isError } = useGetUserAllSaveListQuery("");

  return (
    <main className="bg-white">
      <div className="container mx-auto">
        <div className="w-full">
          <div className="mb-8">
            <h3 className="text-2xl lg:text-4xl font-semibold text-black mb-8">
              My booking lists
            </h3>

            <p className="w-28 h-[1px] bg-border-primary"></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {data && !isLoading && !isError ? (
              data?.data?.map((favorite: any) => (
                <>
                  <FavoriteProductCard favorite={favorite} />
                </>
              ))
            ) : (
              <div className="w-full">
                <h3 className="text-center">loading....</h3>
              </div>
            )}
          </div>

          {/* <div className="flex justify-center">
            <button
              type="button"
              className="bg-primary-color px-11 py-2 text-black-600 font-semibold text-xl rounded-lg"
            >
              Show more
            </button>
          </div> */}
        </div>
      </div>
    </main>
  );

  // const pathName = usePathname();

  // return (
  //   <>
  //     <div className="p-8 border border-border-primary rounded-[20px] mb-8">
  //       <h3 className="text-2xl font-semibold text-black">
  //         Andy Flower’s listings
  //       </h3>

  //       <p className="text-base font-normal text-text-blar mt-2.5">
  //         Andy Flower’s listings is very rich, 5 star reviews help him to be
  //         more branded.
  //       </p>

  //       <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>

  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
  //         {/* <ProductCard />
  //               <ProductCard />
  //               <ProductCard />
  //               <ProductCard /> */}
  //       </div>
  //     </div>

  //     <div className="p-8 border border-border-primary rounded-[20px] mb-8">
  //       <h3 className="text-2xl font-semibold text-black">
  //         Reviews (23 reviews)
  //       </h3>

  //       <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>
  //     </div>
  //   </>
  // );
};

export default MyBookingView;
