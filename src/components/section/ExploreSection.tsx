import ExploreCard from "../card/ExploreCard";

const ExploreSection = () => {
  return (
    <section className="pb-14 md:pb-[120px]">
      <div className="container max-md:px-2.5 mx-auto">
        <div className="mb-14">
          <h2 className="text-center text-3xl md:text-[40px] font-semibold text-black-800 mb-3">
            Explore nearby
          </h2>

          <p className="text-center text-base md:text-lg text-text-blar font-medium">
            Discover great places near where you live
          </p>
        </div>

        <div className="w-full md:w-[90%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
