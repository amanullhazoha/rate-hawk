"use client";

import Image from "next/image";
import map from "@/assets/images/map.jpg";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../../components/card/ProductCard";
import GlobalPagination from "@/components/pagination/GlobalPagination";
import {
  useGetSearchHotelMutation,
  useGetHotelDataMutation,
} from "../slice/search-hotel.slice";
import MultiMarkerLocation from "@/components/map/MultiMarkerLocation";

const SearchPageView = () => {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const [getSearchHotel, { isLoading: isHotelSearching, data }] =
    useGetSearchHotelMutation();
  const [getHotelData, { isLoading: isGetHotelData, data: hotelData }] =
    useGetHotelDataMutation();

  useEffect(() => {
    const payload = {
      checkin: searchParams.get("check-in"),
      checkout: searchParams.get("check-out"),
      residency: searchParams.get("residency"),
      language: searchParams.get("language"),
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
    };

    getSearchHotel(payload);
  }, []);

  useEffect(() => {
    const payload = {
      hotel_ids: data?.data?.data?.hotels
        ?.slice(4 * (page - 1), page * 4)
        ?.map((item: any) => item.id),
      language: searchParams.get("language"),
      region_id: Number(searchParams.get("region_id")),
    };

    if (data?.data?.data?.hotels?.length > 0) getHotelData(payload);
  }, [data, page]);

  return (
    <main className="pt-24 pb-28 bg-white">
      <div className="container mx-auto px-[35px]">
        <div>
          <h3 className="text-4xl text-black font-semibold mb-2">
            Hotels in{" "}
            {searchParams.get("region_name")
              ? searchParams.get("region_name")
              : "unknown"}
          </h3>

          <p className="text-base font-normal text-text-blar flex items-center gap-2 mb-8">
            <span>
              {data?.data?.data?.total_hotels
                ? data?.data?.data?.total_hotels
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

        {isHotelSearching && (
          <div className="w-full text-center">
            <h3>loading...</h3>
          </div>
        )}

        {!isHotelSearching && !hotelData && !isGetHotelData && (
          <div className="w-full text-center">
            <h3>No data found.</h3>
          </div>
        )}

        {!isHotelSearching && hotelData && (
          <>
            <div className="grid-cols-1 grid lg:grid-cols-2 gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {data?.data?.data?.hotels
                  ?.slice(4 * (page - 1), page * 4)
                  ?.map((item: any) => (
                    <ProductCard
                      product={item}
                      key={item?.id}
                      hotelData={hotelData?.data}
                    />
                  ))}
              </div>

              <div>
                <MultiMarkerLocation hotelData={hotelData?.data} />
                {/* <Image src={map} alt="map" className="h-full" /> */}
              </div>
            </div>

            <div className="mt-4">
              <GlobalPagination
                page={page}
                total_element={data?.data?.data?.total_hotels}
                handlePagination={(value: number) => setPage(value)}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default SearchPageView;
