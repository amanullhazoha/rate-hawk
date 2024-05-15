import ExploreSection from "../section/ExploreSection";
import FeaturedPlaceSection from "../section/FeaturedPlaceSection";
import NewsLetterSection from "../section/NewsLetterSection";
import SearchSection from "../section/SearchSection";

const HomePageView = () => {
  return (
    <main>
      <SearchSection />
      <FeaturedPlaceSection />
      <NewsLetterSection />
      <ExploreSection />
    </main>
  );
};

export default HomePageView;
