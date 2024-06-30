"use client";

import { useEffect } from "react";
import { format, addDays } from "date-fns";
import { useSearchParams, useParams } from "next/navigation";
import DetailSection from "@/components/section/DetailSection";
import ProductImageSection from "@/components/section/ProductImageSection";
import {
  useGetHotelDetailMutation,
  useGetHotelBookHashMutation,
} from "../slice/hotel-detail.slice";

const ProductDetailPageView = () => {
  const searchParams = useSearchParams();
  const params: { id: string } = useParams();

  const [getHotelDetail, { isLoading, isError, data }] =
    useGetHotelDetailMutation();
  const [getHotelBookHash, { isLoading: isBookHashLoading, data: bookHash }] =
    useGetHotelBookHashMutation();

  useEffect(() => {
    const payload = {
      id: params.id,
      language: searchParams.get("language")
        ? searchParams.get("language")
        : "en",
    };

    const bookHashPayload = {
      id: params.id,
      checkin: searchParams.get("check-in")
        ? searchParams.get("check-in")
        : format(new Date(), "yyyy-MM-dd"),
      checkout: searchParams.get("check-out")
        ? searchParams.get("check-out")
        : format(addDays(new Date(), 1), "yyyy-MM-dd"),
      language: searchParams.get("language")
        ? searchParams.get("language")
        : "en",
      currency: searchParams.get("currency")
        ? searchParams.get("currency")
        : "USD",
      residency: searchParams.get("residency")
        ? searchParams.get("residency")
        : "gb",
      guests: [
        {
          adults: Number(searchParams.get("adults"))
            ? Number(searchParams.get("adults"))
            : 1,
          children: searchParams.get("children")
            ? searchParams
                .get("children")
                ?.split(",")
                .map((item) => Number(item))
            : [],
        },
      ],
    };

    getHotelDetail(payload);
    getHotelBookHash(bookHashPayload);
  }, [searchParams]);

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
