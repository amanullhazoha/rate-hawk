import MapIcon from "@/assets/icons/MapIcon";
import product_image from "@/assets/images/product.jpg";
import Image from "next/image";

const ProductCard = () => {
  return (
    <div>
      <div className="rounded-[10px] ">
        <Image src={product_image} alt="image" />
      </div>

      <div className="mt-3.5">
        <div className="flex items-center gap-1 mb-2 text-sm font-medium text-text-blar">
          <span>Entire cabin</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="2"
            viewBox="0 0 2 2"
            fill="none"
          >
            <circle cx="1" cy="1" r="1" fill="#6B7280" />
          </svg>
          <span>10 beds</span>
        </div>

        <p className="text-base font-semibold text-black-800 mb-2">
          Best Western Cedars Hotel
        </p>

        <p className="flex gap-2 items-center text-text-blar text-sm font-medium">
          <MapIcon />1 Anzinger Court
        </p>

        <div className="h-[1px] bg-text-light w-14 my-2"></div>

        <div className="flex justify-between items-center">
          <p className="text-base font-medium text-black-800">
            $26 <span className="text-text-blar">/night</span>
          </p>

          <div>
            <span>4.8</span>
            <span>(28)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
