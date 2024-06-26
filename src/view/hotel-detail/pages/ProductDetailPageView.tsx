"use client";

import { useEffect } from "react";
import DetailSection from "@/components/section/DetailSection";
import {
  useGetHotelDetailMutation,
  useGetHotelBookHashMutation,
} from "../slice/hotel-detail.slice";
import ProductImageSection from "@/components/section/ProductImageSection";

const ProductDetailPageView = () => {
  const [getHotelDetail, { isLoading, isError, data }] =
    useGetHotelDetailMutation();
  const [getHotelBookHash, { isLoading: isBookHashLoading, data: bookHash }] =
    useGetHotelBookHashMutation();

  useEffect(() => {
    const payload = {
      id: "bergs_hotel_2",
      language: "en",
    };

    const bookHashPayload = {
      checkin: "2024-06-29",
      checkout: "2024-06-30",
      residency: "gb",
      language: "en",
      guests: [
        {
          adults: 2,
          children: [],
        },
      ],
      id: "bergs_hotel_2",
      currency: "EUR",
    };

    getHotelDetail(payload);
    getHotelBookHash(bookHashPayload);
  }, []);

  return (
    <main className="bg-white pt-2 pb-32">
      <div className="container mx-auto px-2.5">
        {isLoading && <h2>Loading.....</h2>}

        {!isLoading && !isError && (
          <div className="w-full md:w-[90%] mx-auto">
            <ProductImageSection images={data?.data?.data?.images} />
            <DetailSection
              hotelInfo={data?.data?.data}
              bookHash={bookHash?.data?.data?.hotels}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductDetailPageView;
