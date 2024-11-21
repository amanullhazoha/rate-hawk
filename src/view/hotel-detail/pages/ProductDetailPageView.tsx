"use client";

import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import Preloader from "@/components/loading/Preloader";
import { useSearchParams, useParams } from "next/navigation";
import DetailSection from "@/components/section/DetailSection";
import { useGetUserAllSaveListQuery } from "@/view/save-list/slice";
import ProductImageSection from "@/components/section/ProductImageSection";
import {
  useGetHotelDetailMutation,
  useGetHotelBookHashMutation,
} from "../slice/hotel-detail.slice";
import CheckoutLoginPageView from "@/view/login/pages/CheckoutLoginPage";

const ProductDetailPageView = () => {
  const searchParams = useSearchParams();
  const params: { id: string } = useParams();
  const [loginView, setLoginView] = useState(false);

  const { data: favoriteData } = useGetUserAllSaveListQuery("");

  const [getHotelDetail, { isLoading, isError, data }] =
    useGetHotelDetailMutation();
  const [getHotelBookHash, { isLoading: isBookHashLoading, data: bookHash }] =
    useGetHotelBookHashMutation();

  useEffect(() => {
    const payload = {
      id: params.id,
      language: "en",
    };

    const bookHashPayload = {
      id: params.id,
      language: "en",
      checkin: searchParams.get("check-in")
        ? searchParams.get("check-in")
        : format(new Date(), "yyyy-MM-dd"),
      checkout: searchParams.get("check-out")
        ? searchParams.get("check-out")
        : format(addDays(new Date(), 1), "yyyy-MM-dd"),
      currency: searchParams.get("currency")
        ? searchParams.get("currency")
        : "USD",
      residency: searchParams.get("residency")
        ? searchParams.get("residency")
        : "nl",
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
    <main className="bg-white pt-4 pb-10 lg:pb-32">
      <div className="container mx-auto px-2.5">
        {isLoading && (
          <div className="w-full flex justify-center items-center h-40">
            <Preloader title="Hotel Detail Page Loading" />
          </div>
        )}

        {loginView ? (
          <CheckoutLoginPageView setLoginView={setLoginView} />
        ) : (
          !isLoading &&
          !isError &&
          data?.data && (
            <div className="w-full mx-auto">
              <ProductImageSection images={data?.data?.data?.images} />
              <DetailSection
                setLoginView={setLoginView}
                hotelInfo={data?.data?.data}
                favoriteData={favoriteData?.data}
                bookHash={bookHash?.data?.data?.hotels}
              />
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default ProductDetailPageView;
