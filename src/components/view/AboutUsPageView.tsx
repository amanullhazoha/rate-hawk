import AboutBannerSection from "../section/AboutBannerSection";
import AboutCarouselSection from "../section/AboutCarouselSection";
import DifferenceSection from "../section/DifferenceSection";
import FastFactSection from "../section/FastFactSection";
import FounderSection from "../section/FounderSection";
import NewsLetterSection from "../section/NewsLetterSection";
import TeamSection from "../section/TeamSection";

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
