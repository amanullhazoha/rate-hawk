import ExploreSection from "../section/ExploreSection";
import FeaturedPlaceSection from "../section/FeaturedPlaceSection";
import NewsLetterSection from "../section/NewsLetterSection";

const HomePageView = () => {
  return (
    <main>
      <FeaturedPlaceSection />
      <NewsLetterSection />
      <ExploreSection />
    </main>
  );
};

export default HomePageView;
