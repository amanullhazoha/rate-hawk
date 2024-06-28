import Image from "next/image";
import team from "@/assets/images/team.jpg";
import StarIcon from "@/assets/icons/StarIcon";
import Link from "next/link";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import ProductCard from "@/components/card/ProductCard";

const MyBookingView = () => {
  return (
    <main className="bg-white py-20">
      <div className="container mx-auto px-2.5">
        <div className="w-full md:w-[90%] mx-auto flex flex-wrap gap-14">
          <div className="w-full md:w-4/12 p-14 border border-border-primary rounded-[20px] mb-8">
            <div className="flex items-center flex-col gap-4 pb-6">
              <Image
                src={team}
                alt="image"
                className="w-[128px] h-[128px] rounded-full border border-primary-color"
              />

              <p className="text-black-800 text-3xl font-semibold">
                Andy Flower
              </p>

              <p className="flex items-center gap-1">
                <StarIcon />
                <span className="text-sm font-medium text-black-800">4.5</span>
                <span className="text-sm text-normal text-text-blar">
                  (112)
                </span>
              </p>
            </div>

            <p className="text-base font-normal text-text-blar text-center">
              Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
              accommodation, an outdoor.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/"
                className="w-9 h-9 rounded-full flex justify-center items-center bg-text-blar"
              >
                <FacebookIcon />
              </Link>

              <Link
                href="/"
                className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
              >
                <FacebookIcon />
              </Link>

              <Link
                href="/"
                className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
              >
                <FacebookIcon />
              </Link>

              <Link
                href="/"
                className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
              >
                <FacebookIcon />
              </Link>

              <Link
                href="/"
                className="w-9 h-9 rounded-full flex justify-center items-center bg-black-400"
              >
                <FacebookIcon />
              </Link>
            </div>

            <p className="w-20 h-[1px] bg-border-primary mt-8 mb-8 mx-auto"></p>

            <div className="flex justify-center flex-col gap-4 pl-4">
              <div className="flex items-center gap-4">
                <HomeIcon />
                <span className="text-base font-normal text-black-400">
                  California, USA
                </span>
              </div>

              <div className="flex items-center gap-4">
                <HomeIcon />
                <span className="text-base font-normal text-black-400">
                  Speaking English
                </span>
              </div>

              <div className="flex items-center gap-4">
                <HomeIcon />
                <span className="text-base font-normal text-black-400">
                  Joined in March 2020
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-8/12">
            <div className="p-8 border border-border-primary rounded-[20px] mb-8">
              <h3 className="text-2xl font-semibold text-black">
                Andy Flower’s listings
              </h3>

              <p className="text-base font-normal text-text-blar mt-2.5">
                Andy Flower’s listings is very rich, 5 star reviews help him to
                be more branded.
              </p>

              <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard /> */}
              </div>
            </div>

            <div className="p-8 border border-border-primary rounded-[20px] mb-8">
              <h3 className="text-2xl font-semibold text-black">
                Reviews (23 reviews)
              </h3>

              <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyBookingView;
