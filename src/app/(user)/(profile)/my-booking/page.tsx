import { Metadata } from "next";
import { MyBookingView } from "@/view/my-booking";

export const metadata: Metadata = {
  title: "My Booking",
};

const MyBookingPage = () => {
  return <MyBookingView />;
};

export default MyBookingPage;
