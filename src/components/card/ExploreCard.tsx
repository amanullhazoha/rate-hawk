import Image from "next/image";
import image from "@/assets/images/blog.jpg";

const ExploreCard = () => {
  return (
    <div className="p-6 border-[2px] border-primary-color rounded-3xl bg-white flex gap-4 items-center relative overflow-hidden">
      <Image
        src={image}
        alt="image"
        className="w-[100px] h-[100px] rounded-3xl"
      />

      <div>
        <h4 className="text-lg text-black-800 font-medium mb-3">New York</h4>
        <p className="text-text-blar font-normal text-sm">19 minutes drive</p>
      </div>

      <p className="bg-primary-color px-6 absolute top-0 right-0 rounded-bl-full">
        1,882
      </p>
    </div>
  );
};

export default ExploreCard;
