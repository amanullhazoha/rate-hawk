"use client";

import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import ProductCard from "../card/ProductCard";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetUserAllSaveListQuery } from "@/view/save-list/slice.ts";
import {
  useGetHotelDataMutation,
  useGetSearchHotelMutation,
} from "@/view/search-hotel/slice/search-hotel.slice";

const FeaturedPlaceSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [region_id, setRegion_id] = useState(234);
  const { setQueryParams } = useSearchQueryParam();

  const { data: favoriteData } = useGetUserAllSaveListQuery("");
  const [getSearchHotel, { isLoading: isHotelSearching, data }] =
    useGetSearchHotelMutation();
  const [getHotelData, { isLoading: isGetHotelData, data: hotelData }] =
    useGetHotelDataMutation();

  const handleViewAll = () => {
    const adults = "1";
    const language = "en";
    const residency = "gb";
    const currency = "USD";
    const regionId = region_id.toString();
    const checkIn = format(new Date(), "yyyy-MM-dd");
    const checkOut = format(addDays(new Date(), 1), "yyyy-MM-dd");

    let url = searchParams.toString();

    url = checkIn && setQueryParams(url, "check-in", checkIn);
    url = checkOut && setQueryParams(url, "check-out", checkOut);
    url = residency && setQueryParams(url, "residency", residency);
    url = language && setQueryParams(url, "language", language);
    url = regionId && setQueryParams(url, "region_id", regionId);
    url = currency && setQueryParams(url, "currency", currency);
    url = adults && setQueryParams(url, "adults", adults);

    router.push(`/search-hotel${url ? `?${url}` : ""}`);
  };

  useEffect(() => {
    const payload = {
      region_id,
      residency: "gb",
      language: "en",
      checkin: format(new Date(), "yyyy-MM-dd"),
      checkout: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      guests: [
        {
          adults: 1,
          children: [],
        },
      ],
      currency: "USD",
    };

    getSearchHotel(payload);
  }, [region_id]);

  useEffect(() => {
    const payload = {
      region_id,
      language: "en",
      hotel_ids: data?.data?.data?.hotels
        ?.slice(0, 12)
        ?.map((item: any) => item.id),
    };

    if (data?.data?.data?.hotels?.length > 0) getHotelData(payload);
  }, [data, region_id]);

  return (
    <section className="py-[100px] bg-white">
      <div className="container max-md:px-2.5 mx-auto overflow-hidden">
        <div className="w-full md:w-[90%] mx-auto">
          <div className="mb-14">
            <h2 className="text-[40px] font-semibold text-black-800 mb-3">
              Featured places to stay
            </h2>

            <p className="text-lg text-text-blar font-medium">
              Popular places to stay that Chisfis recommends for you
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-14 gap-3">
            <div className="flex gap-2 overflow-auto w-full md:w-fit">
              <div>
                <button
                  type="button"
                  onClick={() => setRegion_id(234)}
                  className={`w-[140px] px-6 py-2 rounded-full text-base font-medium ${
                    region_id === 234
                      ? "bg-primary-color text-black"
                      : "text-black-400"
                  }`}
                >
                  New York
                </button>
              </div>

              <button
                type="button"
                onClick={() => setRegion_id(3593)}
                className={`w-[140px] px-6 py-2 rounded-full text-base font-medium ${
                  region_id === 3593
                    ? "bg-primary-color text-black"
                    : "text-black-400"
                }`}
              >
                Tokyo
              </button>

              <button
                type="button"
                onClick={() => setRegion_id(2734)}
                className={`w-[140px] px-6 py-2 rounded-full text-base font-medium ${
                  region_id === 2734
                    ? "bg-primary-color text-black"
                    : "text-black-400"
                }`}
              >
                Paris
              </button>

              <button
                type="button"
                onClick={() => setRegion_id(2114)}
                className={`w-[140px] px-6 py-2 rounded-full text-base font-medium ${
                  region_id === 2114
                    ? "bg-primary-color text-black"
                    : "text-black-400"
                }`}
              >
                London
              </button>
            </div>

            <button
              type="button"
              onClick={handleViewAll}
              className="px-6 py-2 rounded-full text-base font-medium bg-white text-black-600 border border-text-black-600 flex items-center gap-2"
            >
              View all
              <ArrowIcon />
            </button>
          </div>

          {isGetHotelData || isHotelSearching ? (
            <div className="w-full">
              <p className="text-center w-full">Loading.....</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data?.data?.data?.hotels?.slice(0, 12)?.map((item: any) => (
                <ProductCard
                  product={item}
                  key={item?.id}
                  hotelData={hotelData?.data}
                  favoriteData={favoriteData?.data}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlaceSection;
