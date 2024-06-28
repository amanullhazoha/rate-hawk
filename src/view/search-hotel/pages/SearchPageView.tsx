"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import map from "@/assets/images/map.jpg";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../../components/card/ProductCard";
import {
  useGetSearchHotelMutation,
  useGetHotelDataMutation,
} from "../slice/search-hotel.slice";
import GlobalPagination from "@/components/pagination/GlobalPagination";

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
          children: [],
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

  console.log(data, hotelData);

  return (
    <main className="pt-24 pb-28 bg-white">
      <div className="container mx-auto px-[35px]">
        <div>
          <h3 className="text-4xl text-black font-semibold mb-2">
            Hotels in Tokyo
          </h3>

          <p className="text-base font-normal text-text-blar flex items-center gap-2 mb-8">
            <span>233 stays</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="2"
              viewBox="0 0 2 2"
              fill="none"
            >
              <circle cx="1" cy="1" r="1" fill="#6B7280" />
            </svg>

            <span>Aug 12 - 18</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="2"
              viewBox="0 0 2 2"
              fill="none"
            >
              <circle cx="1" cy="1" r="1" fill="#6B7280" />
            </svg>

            <span>2 Guests</span>
          </p>
        </div>

        <div className="grid-cols-1 grid lg:grid-cols-2 gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {data?.data?.data?.hotels
              ?.slice(4 * (page - 1), page * 4)
              ?.map((item: any) => (
                <ProductCard product={item} hotelData={hotelData?.data} />
              ))}
          </div>

          <div>
            <Image src={map} alt="map" className="h-full" />
          </div>
        </div>

        <div className="mt-4">
          <GlobalPagination
            page={page}
            total_element={data?.data?.data?.total_hotels}
            handlePagination={(value: number) => setPage(value)}
          />
        </div>
      </div>
    </main>
  );
};

export default SearchPageView;
