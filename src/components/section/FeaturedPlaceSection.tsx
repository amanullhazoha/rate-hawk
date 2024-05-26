import ArrowIcon from "@/assets/icons/ArrowIcon";
import ProductCard from "../card/ProductCard";

const FeaturedPlaceSection = () => {
  return (
    <section className="py-[100px] bg-white">
      <div className="container max-md:px-2.5 mx-auto overflow-hidden">
        <div className="w-full md:w-[90%] mx-auto">
          <div className="mb-14">
            <h2 className="text-[40px] font-semibold text-black-800 mb-3">
              Featured places to stay
            </h2>

            <p className="text-lg text-text-blar font-medium">
              Popular places to stay that Chisfis recommends for you
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-14 gap-3">
            <div className="flex gap-2 overflow-auto w-full md:w-fit">
              <div>
                <button
                  type="button"
                  className="w-[140px] px-6 py-2 rounded-full text-base font-medium bg-primary-color text-black"
                >
                  New York
                </button>
              </div>

              <button
                type="button"
                className="px-6 py-2 rounded-full text-black-400 text-base font-medium"
              >
                Tokyo
              </button>

              <button
                type="button"
                className="px-6 py-2 rounded-full text-black-400 text-base font-medium"
              >
                Paris
              </button>

              <button
                type="button"
                className="px-6 py-2 rounded-full text-black-400 text-base font-medium"
              >
                London
              </button>
            </div>

            <button
              type="button"
              className="px-6 py-2 rounded-full text-base font-medium bg-white text-black-600 border border-text-black-600 flex items-center gap-2"
            >
              View all
              <ArrowIcon />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlaceSection;
