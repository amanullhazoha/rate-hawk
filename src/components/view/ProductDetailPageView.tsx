import DetailSection from "../section/DetailSection";
import ProductImageSection from "../section/ProductImageSection";

const ProductDetailPageView = () => {
  return (
    <main className="bg-white pt-2 pb-32">
      <div className="container mx-auto px-2.5">
        <div className="w-full md:w-[90%] mx-auto">
          <ProductImageSection />
          <DetailSection />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPageView;
