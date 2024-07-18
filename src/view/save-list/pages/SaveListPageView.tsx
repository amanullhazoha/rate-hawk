"use client";

import { useGetUserAllSaveListQuery } from "../slice";
import FavoriteProductCard from "@/components/card/FavoriteProductCard";

const SaveListPageView = () => {
  const { data, isLoading, isError } = useGetUserAllSaveListQuery("");

  return (
    <main className="bg-white">
      <div className="container mx-auto">
        <div className="w-full">
          <div className="mb-8">
            <h3 className="text-2xl lg:text-4xl font-semibold text-black mb-8">
              Save lists
            </h3>

            <p className="w-28 h-[1px] bg-border-primary"></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
};

export default SaveListPageView;
