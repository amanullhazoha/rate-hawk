import { Metadata } from "next";
import { ProductDetailPageView } from "@/view/hotel-detail";

export const metadata: Metadata = {
  title: "Hotel Detail",
};

const HotelDetailPage = () => {
  return <ProductDetailPageView />;
};

export default HotelDetailPage;
