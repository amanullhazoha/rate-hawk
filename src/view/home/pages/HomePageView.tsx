import SearchSection from "@/components/section/SearchSection";
import ExploreSection from "@/components/section/ExploreSection";
// import NewsLetterSection from "@/components/section/NewsLetterSection";
import FeaturedPlaceSection from "@/components/section/FeaturedPlaceSection";

const HomePageView = () => {
  return (
    <main>
      <SearchSection />
      <FeaturedPlaceSection />
      {/* <NewsLetterSection /> */}
      <ExploreSection />
    </main>
  );
};

export default HomePageView;
