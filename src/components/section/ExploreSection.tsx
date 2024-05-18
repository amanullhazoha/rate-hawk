import ExploreCard from "../card/ExploreCard";

const ExploreSection = () => {
  return (
    <section className="pt-[150px] pb-[120px]">
      <div className="container mx-auto">
        <div className="mb-14">
          <h2 className="text-center text-[40px] font-semibold text-black-800 mb-3">
            Explore nearby
          </h2>

          <p className="text-center text-lg text-text-blar font-medium">
            Discover great places near where you live
          </p>
        </div>

        <div className="w-[90%] mx-auto">
          <div className="grid grid-cols-4 gap-8">
            <ExploreCard />
            <ExploreCard />
            <ExploreCard />
            <ExploreCard />
            <ExploreCard />
            <ExploreCard />
            <ExploreCard />
            <ExploreCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
