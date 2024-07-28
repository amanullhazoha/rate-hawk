"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import ProductCard from "../../../components/card/ProductCard";
import { useGetUserAllSaveListQuery } from "@/view/save-list/slice";
import MultiMarkerLocation from "@/components/map/MultiMarkerLocation";
import GlobalPagination from "@/components/pagination/GlobalPagination";
import {
  useGetHotelDumpDataQuery,
  useGetSearchHotelByIdsMutation,
} from "../slice/search-hotel.slice";

const SearchPageView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const { setQueryParams } = useSearchQueryParam();
  const star: string | null = searchParams.get("star");
  const activePage: string | null = searchParams.get("page");
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
  const { data: hotelDumpData, isLoading: isHotelDumpLoading } =
    useGetHotelDumpDataQuery(filter, { skip: skipQuery });

  const handlePagination = (value: number) => {
    let url: string | null = searchParams?.toString();

    url = setQueryParams(url, "page", value.toString());

    setPage(value);

    router.push(`/search-hotel${url ? `?${url}` : ""}`);
  };

  const [getSearchHotelByIds, { isLoading: isLoadingByIds, data: dataByIds }] =
    useGetSearchHotelByIdsMutation();

  useEffect(() => {
    if (activePage) {
      setPage(Number(activePage));
    }
  }, []);

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
  }, [hotelDumpData, searchParams]);

  return (
    <main className="pt-4 pb-10 bg-white">
      <div className="container mx-auto px-2.5 lg:px-[35px]">
        {/* <div>
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
        </div> */}

        <div className="shadow-md px-2 py-1 rounded-md w-fit mb-8 border border-blue-50">
          <Link href="/" className="mr-2 text-blue-500 font-medium">
            Home
          </Link>
          <span className="mr-2">{">"}</span>

          <span className="font-medium">Search</span>
        </div>

        <div className="w-full mb-5 shadow-md px-2 py-3 border border-blue-200">
          <p className="text-black text-xl mb-2 text-start font-medium">
            Searching for options in{" "}
            {searchParams.get("region_name")
              ? searchParams.get("region_name")
              : "unknown"}
          </p>

          <p className="text-base font-normal text-text-blar flex flex-wrap items-center gap-2">
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

          {(isLoadingByIds || isHotelDumpLoading) && (
            <div className="w-full h-auto flex justify-center items-center mt-4">
              <div className="w-full h-[10px] border-orange-500 rounded-[20px] bg-blue-300">
                <div className="h-[10px] rounded-[20px] bg-yellow-300 animate-loading"></div>
              </div>
            </div>
          )}
        </div>

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
                    handlePagination={(value: number) =>
                      handlePagination(value)
                    }
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
