import Image from "next/image";
import newsLetter from "@/assets/images/news-letter.png";
import NumberOne from "@/assets/icons/NumberOne";
import NumberTwo from "@/assets/icons/NumberTwo";
import Direction from "@/assets/icons/Direction";

const NewsLetterSection = () => {
  return (
    <div className="bg-yellow-100 lg:py-[100px] md:py-20 py-14 ">
      <div className="max-w-[1152px] mx-auto  flex items-center justify-center gap-[124px]">
        <div className="lg:w-1/2 w-full max-lg:px-5">
          <h2 className="heading mb-3">Join our newsletter</h2>
          <p className="lg:text-lg text-sm font-medium text-black-400">
            Read and share new perspectives on just about any topic. Everyone’s
            welcome.
          </p>

          <div className="my-10">
            <div className="flex items-center gap-4 mb-3">
              <NumberOne />
              <p className="text-black-400 font-medium">Get more discount</p>
            </div>
            <div className="flex items-center gap-4">
              <NumberTwo />
              <p className="text-black-400 font-medium">
                Get premium magazines
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between md:p-3 p-2 md:pl-8 pl-5 bg-white border-[1.5px] border-semi-primary rounded-[50px] relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-full outline-none focus:outline-none border-none placeholder:text-text-light md:placeholder:text-lg md:text-lg text-md"
              />
              <button>
                <svg
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10"
                >
                  <rect
                    y="0.166718"
                    width="40"
                    height="40"
                    rx="20"
                    fill="#9E9012"
                  />
                  <path
                    d="M10 20.1667H30M30 20.1667L21.6667 11.8334M30 20.1667L21.6667 28.5001"
                    stroke="white"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <div className="absolute left-full -translate-x-1/2 bottom-0 max-lg:hidden">
                <Direction />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 relative max-lg:hidden">
          <Image
            src="/images/contact.png"
            width={500}
            height={517}
            objectFit="cover"
            alt="Contact Refiqi"
          />
        </div>
      </div>
    </div>
    // <section className="bg-yellow-bg py-[100px]">
    //   <div className="container max-md:px-2.5 mx-auto">
    //     <div className="w-full md:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[124px] items-center">
    //       <div className="mb-14">
    //         <h2 className="text-[40px] font-semibold text-black-800 mb-3">
    //           Join our newsletter
    //         </h2>

    //         <p className="text-lg text-text-blar font-medium">
    //           Read and share new perspectives on just about any topic.
    //           Everyone’s welcome.
    //         </p>

    //         <div className="mt-9 flex gap-3.5 flex-col">
    //           <div className="flex gap-4 items-center">
    //             <span className="px-2.5 py-1 rounded-[20px] bg-sky-bg text-xs font-medium text-text-blue">
    //               01
    //             </span>

    //             <p className="text-base font-medium text-black-400">
    //               Get more discount
    //             </p>
    //           </div>

    //           <div className="flex gap-4 items-center">
    //             <span className="px-2.5 py-1 rounded-[20px] bg-red-bg-900 text-xs font-medium text-text-red">
    //               02
    //             </span>

    //             <p className="text-base font-medium text-black-400">
    //               Get premium magazines
    //             </p>
    //           </div>
    //         </div>

    //         <form className="mt-9 relative flex items-center justify-end">
    //           <input
    //             type="email"
    //             placeholder="Enter your email"
    //             className="px-8 py-3 w-full rounded-full border-[1.5px] border-semi-primary outline-none"
    //           />

    //           <button type="submit" className="absolute right-2">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="40"
    //               height="41"
    //               viewBox="0 0 40 41"
    //               fill="none"
    //             >
    //               <rect
    //                 y="0.358398"
    //                 width="40"
    //                 height="40"
    //                 rx="20"
    //                 fill="#9E9012"
    //               />
    //               <path
    //                 d="M10 20.3587H30M30 20.3587L21.6667 12.0254M30 20.3587L21.6667 28.6921"
    //                 stroke="white"
    //                 stroke-width="1.8"
    //                 stroke-linecap="round"
    //                 stroke-linejoin="round"
    //               />
    //             </svg>
    //           </button>
    //         </form>
    //       </div>

    //       <div className="hidden lg:block">
    //         <Image src={newsLetter} alt="image" />
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default NewsLetterSection;
