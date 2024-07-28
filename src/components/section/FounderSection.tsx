import Image from "next/image";
import fonder from "@/assets/images/founder.jpg";
import signature from "@/assets/images/signature.jpg";

const FounderSection = () => {
  return (
    <section className="bg-white mb-20">
      <div className="container mx-auto">
        <div className="w-[90%] mx-auto">
          <div className="mb-20 w-[60%]">
            <h3 className="text-4xl text-black-800 font-semibold mb-6">
              Meet the Visionaries Behind
            </h3>

            <p className="text-base font-normal text-black">
              At [Your Hotel Booking Platform], our success is driven by the
              passion and dedication of our founder and the talented individuals
              who make up our team. Get to know the visionaries who are shaping
              the future of travel:
            </p>
          </div>

          <div className="bg-yellow-50 rounded-[40px] flex flex-col md:flex-row gap-12 p-3 md:p-10 items-center">
            <Image
              src={fonder}
              alt="founder image"
              className="rounded-[40px]"
            />

            <div>
              <h4 className="text-4xl text-black-800 font-medium mb-6">
                Founder&apos;s Vision: Mr. Anderson
              </h4>

              <p className="text-base text-black-800 font-normal">
                Anderson had a vision: to revolutionize the way people
                experience travel. With a background in Booking tickets luxury
                hotels, Anderson set out to create a platform that not only
                simplifies the booking process but also inspires wanderlust and
                fosters meaningful connections between travelers and
                destinations.
              </p>

              <div className="flex justify-end mt-5">
                <Image src={signature} alt="signature" className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
