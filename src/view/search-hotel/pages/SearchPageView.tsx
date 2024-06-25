"use client";

import Image from "next/image";
import { useEffect } from "react";
import map from "@/assets/images/map.jpg";
import ProductCard from "../../../components/card/ProductCard";
import { useGetSearchHotelMutation } from "../slice/search-hotel.slice";

const SearchPageView = () => {
  const [getSearchHotel, { isLoading: isHotelSearching, data }] =
    useGetSearchHotelMutation();

  useEffect(() => {
    const payload = {
      checkin: "2024-06-25",
      checkout: "2024-06-26",
      residency: "gb",
      language: "en",
      guests: [
        {
          adults: 2,
          children: [],
        },
      ],
      region_id: 1798,
      currency: "EUR",
    };

    getSearchHotel(payload);
  }, []);

  console.log(data);

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
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>

          <div>
            <Image src={map} alt="map" className="h-full" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPageView;
