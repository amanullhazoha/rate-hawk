import { Metadata } from "next";
import { AboutUsPageView } from "@/view/about-us";

export const metadata: Metadata = {
  title: "About",
};

const AboutUs = () => {
  return <AboutUsPageView />;
};

export default AboutUs;
