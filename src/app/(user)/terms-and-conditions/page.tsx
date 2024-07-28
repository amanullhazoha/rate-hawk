import { Metadata } from "next";
import { AboutUsNewPageView } from "@/view/about-us";

export const metadata: Metadata = {
  title: "About",
};

const AboutUs = () => {
  return <AboutUsNewPageView />;
};

export default AboutUs;
