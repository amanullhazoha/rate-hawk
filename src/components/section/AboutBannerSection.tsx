import banner_image from "@/assets/images/about_banner.jpg";
import Image from "next/image";

const AboutBannerSection = () => {
  return (
    <section>
      <Image src={banner_image} alt="banner image" />

      <div className="container mx-auto relative flex justify-center h-[300px]">
        <div className="w-[80%] mx-auto absolute top-[-110px]">
          <div className="bg-yellow-100 rounded-[20px] px-10 py-8 shadow-md">
            <h1 className="mb-10 text-[40px] font-semibold text-black-800 text-center">
              Welcome to [name]
            </h1>

            <p className="text-lg font-medium text-black-600">
              Welcome to a world of boundless possibilities and endless
              adventures. At [Your Hotel Booking Platform], we're dedicated to
              turning your travel dreams into reality. Whether you're seeking
              luxury, relaxation, or adventure, we're here to guide you every
              step of the way. Join us as we embark on unforgettable journeys
              together, one booking at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBannerSection;
