import StarIcon from "@/assets/icons/StarIcon";
import team from "@/assets/images/team.jpg";
import Image from "next/image";

const TestimonialCard = () => {
  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 w-[50%] bg-yellow-bg rounded-[20px] z-0"></div>

      <div className="relative pl-20 pt-10">
        <div className="bg-white px-12 py-10 rounded-xl shadow-shadow-primary relative flex items-center">
          <div className="absolute overflow-hidden p-2.5 bg-white left-[-60px] rounded-[50%]">
            <Image
              src={team}
              alt="image"
              className="w-[80px] H-[80px] rounded-[50%] border border-[#00FFF0]"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>

            <p className="text-base text-text-blar font-normal italic mb-6">
              There are many variations of passage of Lorem Ipsum available, but
              the majority have suffered alteration in some from, by injected
              humour or
            </p>

            <div className="flex justify-between">
              <div>
                <h5 className="text-2xl font-medium text-black-800">
                  Miss Layla
                </h5>

                <p className="text-base text-text-blar font-normal">
                  silicon valley, California
                </p>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="41"
                viewBox="0 0 48 41"
                fill="none"
              >
                <path
                  d="M8.5 20.5V21H9H16.5C18.7197 21 20.5 22.7551 20.5 24.8929V36.6071C20.5 38.7449 18.7197 40.5 16.5 40.5H4.5C2.28034 40.5 0.5 38.7449 0.5 36.6071V14.6429C0.5 6.84011 6.97722 0.5 15 0.5H15.75C16.7322 0.5 17.5 1.26667 17.5 2.19643V6.58929C17.5 7.51904 16.7322 8.28571 15.75 8.28571H15C11.4259 8.28571 8.5 11.1248 8.5 14.6429V20.5ZM35.5 20.5V21H36H43.5C45.7197 21 47.5 22.7551 47.5 24.8929V36.6071C47.5 38.7449 45.7197 40.5 43.5 40.5H31.5C29.2803 40.5 27.5 38.7449 27.5 36.6071V14.6429C27.5 6.84011 33.9772 0.5 42 0.5H42.75C43.7322 0.5 44.5 1.26667 44.5 2.19643V6.58929C44.5 7.51904 43.7322 8.28571 42.75 8.28571H42C38.4259 8.28571 35.5 11.1248 35.5 14.6429V20.5Z"
                  stroke="#B8B8B8"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
