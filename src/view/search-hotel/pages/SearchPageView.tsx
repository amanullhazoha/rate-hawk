"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../../components/card/ProductCard";
import { useGetUserAllSaveListQuery } from "@/view/save-list/slice";
import MultiMarkerLocation from "@/components/map/MultiMarkerLocation";
import GlobalPagination from "@/components/pagination/GlobalPagination";
import {
  useGetHotelDumpDataQuery,
  useGetSearchHotelByIdsMutation,
} from "../slice/search-hotel.slice";

const SearchPageView = () => {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const star: string | null = searchParams.get("star");
  const region_id: string | null = searchParams.get("region_id");

  const skipQuery = !region_id || !page;

  let filter: any = {};

  if (star) {
    filter.star = star;
  }

  if (region_id) {
    filter.region_id = region_id;
  }

  if (page) {
    filter.page = page;
  }

  const { data: favoriteData } = useGetUserAllSaveListQuery("");
  const {
    data: hotelDumpData,
    isLoading: isHotelDumpLoading,
    refetch,
    isFetching,
  } = useGetHotelDumpDataQuery(filter, { skip: skipQuery });

  const [getSearchHotelByIds, { isLoading: isLoadingByIds, data: dataByIds }] =
    useGetSearchHotelByIdsMutation();

  useEffect(() => {
    const payload = {
      language: "en",
      star: searchParams.get("star"),
      checkin: searchParams.get("check-in"),
      checkout: searchParams.get("check-out"),
      residency: searchParams.get("residency"),
      guests: [
        {
          adults: Number(searchParams.get("adults")),
          children: searchParams.get("children")
            ? searchParams
                .get("children")
                ?.split(",")
                .map((item) => Number(item))
            : [],
        },
      ],
      region_id: Number(searchParams.get("region_id")),
      currency: searchParams.get("currency"),
      ids: hotelDumpData?.data?.map((item: any) => item.id),
    };

    if (hotelDumpData?.data?.length > 0) getSearchHotelByIds(payload);
  }, [hotelDumpData, page, searchParams]);

  return (
    <main className="pt-10 lg:pt-24 pb-10 lg:pb-28 bg-white">
      <div className="container mx-auto px-2.5 lg:px-[35px]">
        <div>
          <h3 className="text-2xl lg:text-4xl text-black font-semibold mb-2">
            Hotels in{" "}
            {searchParams.get("region_name")
              ? searchParams.get("region_name")
              : "unknown"}
          </h3>

          <p className="text-base font-normal text-text-blar flex flex-wrap items-center gap-2 mb-8">
            <span>
              {hotelDumpData?.pagination?.totalItems
                ? hotelDumpData?.pagination?.totalItems
                : 0}{" "}
              stays
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="2"
              viewBox="0 0 2 2"
              fill="none"
            >
              <circle cx="1" cy="1" r="1" fill="#6B7280" />
            </svg>

            <span>
              {searchParams.get("check-in")} - {searchParams.get("check-out")}
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="2"
              viewBox="0 0 2 2"
              fill="none"
            >
              <circle cx="1" cy="1" r="1" fill="#6B7280" />
            </svg>

            <span>{searchParams.get("adults")} Guests</span>
          </p>
        </div>

        {(isLoadingByIds || isHotelDumpLoading) && (
          <div className="w-full text-center">
            <h3>loading...</h3>
          </div>
        )}

        {hotelDumpData?.pagination?.totalItems <= 0 && !isLoadingByIds && (
          <div className="w-full text-center">
            <h3>No data found.</h3>
          </div>
        )}

        {hotelDumpData &&
          dataByIds &&
          !isLoadingByIds &&
          !isHotelDumpLoading && (
            <>
              <div className="grid-cols-1 grid lg:grid-cols-2 gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {hotelDumpData?.data?.map((item: any) => (
                    <ProductCard
                      product={item}
                      key={item?.id}
                      favoriteData={favoriteData?.data}
                      hotelData={dataByIds?.data?.data?.hotels}
                    />
                  ))}
                </div>

                <div className="w-full lg:w-full h-[400px] lg:h-full">
                  <MultiMarkerLocation hotelData={hotelDumpData?.data} />
                </div>
              </div>

              {hotelDumpData?.pagination?.totalItems > 8 && (
                <div className="mt-4">
                  <GlobalPagination
                    page={page}
                    total_element={hotelDumpData?.pagination?.totalItems}
                    handlePagination={(value: number) => setPage(value)}
                  />
                </div>
              )}
            </>
          )}
      </div>
    </main>
  );
};

export default SearchPageView;
