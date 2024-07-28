import TeamSection from "@/components/section/TeamSection";
import FounderSection from "@/components/section/FounderSection";
import FastFactSection from "@/components/section/FastFactSection";
import DifferenceSection from "@/components/section/DifferenceSection";
import NewsLetterSection from "@/components/section/NewsLetterSection";
import AboutBannerSection from "@/components/section/AboutBannerSection";
import AboutCarouselSection from "@/components/section/AboutCarouselSection";

const AboutUsPageView = () => {
  return (
    <main>
      <AboutBannerSection />
      <FounderSection />
      <TeamSection />
      <DifferenceSection />
      <FastFactSection />
      <NewsLetterSection />
      <AboutCarouselSection />
    </main>
  );
};

export default AboutUsPageView;
