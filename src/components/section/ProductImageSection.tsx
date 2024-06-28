import Image from "next/image";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import product from "@/assets/images/product.jpg";

const responsive = {
  mobile: {
    breakpoint: { max: 20000, min: 0 },
    items: 1,
  },
};

const ProductImageSection = ({ images }: { images: any }) => {
  const [productImage, setProductImage] = useState([]);

  useEffect(() => {
    if (images?.length > 0) {
      const newImages = images.map((image: string) =>
        image.replace("{size}", "200x200"),
      );

      setProductImage(newImages);
    }
  }, [images]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-16">
      <>
        <div className="relative overflow-hidden">
          <Carousel responsive={responsive}>
            {productImage?.map((image: string) => (
              <div className="w-full h-[410px] overflow-hidden" key={image}>
                <Image
                  fill
                  alt="image"
                  src={image}
                  className="h-full rounded-md"
                />
              </div>
            ))}
          </Carousel>

          {/* <button
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
          </button> */}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="relative h-[200px]">
            <Image
              fill
              alt="image"
              className="rounded-md object-cover h-full"
              src={productImage?.length > 1 ? productImage[1] : product}
            />
          </div>

          <div className="relative h-[200px]">
            <Image
              fill
              alt="image"
              className="rounded-md object-cover h-full"
              src={productImage?.length > 2 ? productImage[2] : product}
            />
          </div>

          <div className="relative h-[200px]">
            <Image
              fill
              alt="image"
              className="rounded-md object-cover"
              src={productImage?.length > 3 ? productImage[3] : product}
            />
          </div>

          <div className="relative h-[200px]">
            <Image
              fill
              alt="image"
              className="rounded-md object-cover"
              src={productImage?.length > 4 ? productImage[4] : product}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default ProductImageSection;
