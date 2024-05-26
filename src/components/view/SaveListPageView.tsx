import ProductCard from "../card/ProductCard";

const SaveListPageView = () => {
  return (
    <main className="bg-white pt-[70px] pb-[150px]">
      <div className="container mx-auto">
        <div className="w-[90%] mx-auto">
          <div className="mb-8">
            <h3 className="text-4xl font-semibold text-black mb-8">
              Save lists
            </h3>

            <p className="w-28 h-[1px] bg-border-primary"></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="bg-primary-color px-11 py-2 text-black-600 font-semibold text-xl rounded-lg"
            >
              Show more
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SaveListPageView;
