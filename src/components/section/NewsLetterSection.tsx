import Image from "next/image";
import newsLetter from "@/assets/images/news-letter.png";

const NewsLetterSection = () => {
  return (
    <section className="bg-yellow-bg py-[100px]">
      <div className="container mx-auto">
        <div className="w-[80%] mx-auto grid grid-cols-2 gap-[124px] items-center">
          <div className="mb-14">
            <h2 className="text-[40px] font-semibold text-black-800 mb-3">
              Join our newsletter
            </h2>

            <p className="text-lg text-text-blar font-medium">
              Read and share new perspectives on just about any topic.
              Everyone’s welcome.
            </p>

            <div className="mt-9 flex gap-3.5 flex-col">
              <div className="flex gap-4 items-center">
                <span className="px-2.5 py-1 rounded-[20px] bg-sky-bg text-xs font-medium text-text-blue">
                  01
                </span>

                <p className="text-base font-medium text-black-400">
                  Get more discount
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <span className="px-2.5 py-1 rounded-[20px] bg-red-bg-900 text-xs font-medium text-text-red">
                  02
                </span>

                <p className="text-base font-medium text-black-400">
                  Get premium magazines
                </p>
              </div>
            </div>

            <form className="mt-9 relative flex items-center justify-end">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-8 py-3 w-full rounded-full border-[1.5px] border-semi-primary outline-none"
              />

              <button type="submit" className="absolute right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                >
                  <rect
                    y="0.358398"
                    width="40"
                    height="40"
                    rx="20"
                    fill="#9E9012"
                  />
                  <path
                    d="M10 20.3587H30M30 20.3587L21.6667 12.0254M30 20.3587L21.6667 28.6921"
                    stroke="white"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div>
            <Image src={newsLetter} alt="image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetterSection;
