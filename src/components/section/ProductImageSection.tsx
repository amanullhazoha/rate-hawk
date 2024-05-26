import Image from "next/image";
import product from "@/assets/images/product.jpg";
import product1 from "@/assets/images/product_1.jpg";

const ProductImageSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-16">
      <div className="relative">
        <Image src={product1} alt="image" className="h-full" />

        <button
          type="button"
          className="absolute bottom-5 left-5 flex items-center gap-2.5 bg-white rounded-xl px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M0.5 0.5H5.5V5.5H0.5V0.5ZM8.5 0.5H13.5V5.5H8.5V0.5ZM0.5 8.5H5.5V13.5H0.5V8.5ZM8.5 8.5H13.5V13.5H8.5V8.5Z"
              fill="#D9D9D9"
              stroke="black"
            />
          </svg>

          <span>Show all photos</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Image src={product} alt="image" />
        <Image src={product} alt="image" />
        <Image src={product} alt="image" />
        <Image src={product} alt="image" />
      </div>
    </div>
  );
};

export default ProductImageSection;
