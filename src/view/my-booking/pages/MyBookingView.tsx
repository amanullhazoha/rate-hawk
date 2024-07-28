"use client";

import { useGetUserOrderListQuery } from "../slices";
import Preloader from "@/components/loading/Preloader";
import FavoriteProductCard from "@/components/card/FavoriteProductCard";

const MyBookingView = () => {
  const { data, isLoading, isError } = useGetUserOrderListQuery("");

  console.log(data);

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

          {isLoading && !isError && (
            <div className="w-full flex justify-center items-center h-40">
              <Preloader title="Hotel Detail Page Loading" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data &&
              !isLoading &&
              !isError &&
              data?.data?.map((favorite: any) => (
                <>
                  <FavoriteProductCard favorite={favorite} />
                </>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyBookingView;
