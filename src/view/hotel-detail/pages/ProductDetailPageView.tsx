"use client";

import { useEffect } from "react";
import DetailSection from "@/components/section/DetailSection";
import { useGetHotelDetailMutation } from "../slice/hotel-detail.slice";
import ProductImageSection from "@/components/section/ProductImageSection";

const ProductDetailPageView = () => {
  const [getHotelDetail, { isLoading: isCreating, data }] =
    useGetHotelDetailMutation();

  useEffect(() => {
    const payload = {
      id: "bergs_hotel_2",
      language: "en",
    };

    getHotelDetail(payload);
  }, []);

  console.log(data);

  return (
    <main className="bg-white pt-2 pb-32">
      <div className="container mx-auto px-2.5">
        <div className="w-full md:w-[90%] mx-auto">
          <ProductImageSection />
          <DetailSection />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPageView;
