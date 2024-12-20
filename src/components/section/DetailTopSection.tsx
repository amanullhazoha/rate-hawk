"use client";

import { toast } from "react-toastify";
import ShareCard from "../card/ShareCard";
import MapIcon from "@/assets/icons/MapIcon";
import StarIcon from "@/assets/icons/StarIcon";
import {
  useUserAddFavoriteMutation,
  useUserRemoveFavoriteMutation,
} from "@/view/save-list/slice";

const DetailTopSection = ({
  kind,
  name,
  address,
  hotel_id,
  hotelInfo,
  star_rating,
  favoriteData,
}: {
  kind?: string;
  name?: string;
  hotelInfo: any;
  address: string;
  hotel_id: string;
  favoriteData: any;
  star_rating?: number;
}) => {
  const [userAddFavorite] = useUserAddFavoriteMutation();
  const [userRemoveFavorite] = useUserRemoveFavoriteMutation();

  const isFavorite = favoriteData?.find(
    (item: any) => item?.hotel_id === hotel_id
  )
    ? true
    : false;

  const handleFavorite = async ({
    hotel,
    hotel_id,
    isFavorite = false,
  }: {
    hotel: any;
    hotel_id: string;
    isFavorite: boolean;
  }) => {
    if (isFavorite) {
      const data: any = await userRemoveFavorite(hotel_id);

      if (data?.error) return toast.error(data?.error.data);

      toast.success("Remove Favorite successfully.");
    } else {
      const payload = {
        hotel: {
          kind,
          hotel_id,
          name: hotel?.name,
          images: hotel?.images,
          latitude: hotel?.latitude,
          longitude: hotel?.longitude,
          region_id: hotel?.region?.id,
          star_rating: hotel?.star_rating,
          region_name: hotel?.region?.name,
        },
        hotel_id,
      };

      const data: any = await userAddFavorite(payload);

      if (data?.error) return toast.error(data?.error.data);

      toast.success("Add Favorite successfully.");
    }
  };

  return (
    <div className="px-4 md:px-6 py-4 md:py-6 border border-border-primary rounded-[20px] mb-6">
      <div className="flex justify-between items-center mb-6">
        <p className="bg-yellow-100 text-xs text-semi-primary font-medium px-3 py-1 rounded-[20px] border border-semi-primary">
          {kind}
        </p>

        <div className="flex items-center gap-7 relative">
          <div className="flex items-center gap-3 text-sm text-black font-medium group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M5.64645 3.64645C5.45118 3.84171 5.45118 4.15829 5.64645 4.35355C5.84171 4.54882 6.15829 4.54882 6.35355 4.35355L5.64645 3.64645ZM9 1L9.35355 0.646447C9.25979 0.552678 9.13261 0.5 9 0.5C8.86739 0.5 8.74021 0.552678 8.64645 0.646447L9 1ZM11.6464 4.35355C11.8417 4.54882 12.1583 4.54882 12.3536 4.35355C12.5488 4.15829 12.5488 3.84171 12.3536 3.64645L11.6464 4.35355ZM8.5 11C8.5 11.2761 8.72386 11.5 9 11.5C9.27614 11.5 9.5 11.2761 9.5 11H8.5ZM4.00023 6.5C4.27637 6.5 4.50023 6.27614 4.50023 6C4.50023 5.72386 4.27637 5.5 4.00023 5.5V6.5ZM2.23486 6.1522L2.04357 5.69024L2.04351 5.69027L2.23486 6.1522ZM1.15224 7.2349L1.61417 7.42626L1.61418 7.42623L1.15224 7.2349ZM1.21799 15.9076L1.66349 15.6806L1.66349 15.6806L1.21799 15.9076ZM2.0918 16.7822L2.31882 16.3367L2.31875 16.3367L2.0918 16.7822ZM15.9079 16.7822L15.6809 16.3367L15.6809 16.3367L15.9079 16.7822ZM16.7822 15.9076L16.3367 15.6806L16.3367 15.6806L16.7822 15.9076ZM16.8477 7.2349L17.3097 7.04358L17.3096 7.04356L16.8477 7.2349ZM15.7654 6.1522L15.9568 5.69027L15.9567 5.69023L15.7654 6.1522ZM14 5.5C13.7239 5.5 13.5 5.72386 13.5 6C13.5 6.27614 13.7239 6.5 14 6.5V5.5ZM6.35355 4.35355L9.35355 1.35355L8.64645 0.646447L5.64645 3.64645L6.35355 4.35355ZM8.64645 1.35355L11.6464 4.35355L12.3536 3.64645L9.35355 0.646447L8.64645 1.35355ZM4.00023 5.5C3.54113 5.5 3.17177 5.49973 2.87189 5.52018C2.56753 5.54095 2.2984 5.58471 2.04357 5.69024L2.42615 6.61416C2.53887 6.56749 2.68648 6.53516 2.93995 6.51787C3.1979 6.50027 3.52745 6.5 4.00023 6.5V5.5ZM2.04351 5.69027C1.43094 5.94402 0.944026 6.43096 0.690295 7.04357L1.61418 7.42623C1.76643 7.05864 2.05868 6.76638 2.42621 6.61414L2.04351 5.69027ZM0.690307 7.04354C0.584745 7.29836 0.540959 7.56743 0.52019 7.87176C0.499729 8.17158 0.5 8.54089 0.5 9H1.5C1.5 8.52721 1.50027 8.19772 1.51787 7.93984C1.53516 7.68647 1.56749 7.53894 1.61417 7.42626L0.690307 7.04354ZM0.5 9V13.8H1.5V9H0.5ZM0.5 13.8C0.5 14.3518 0.499611 14.7956 0.52891 15.1541C0.558689 15.5185 0.621605 15.8385 0.772493 16.1346L1.66349 15.6806C1.59639 15.5489 1.55031 15.3751 1.52559 15.0727C1.50039 14.7644 1.5 14.3683 1.5 13.8H0.5ZM0.772489 16.1346C1.01193 16.6045 1.39395 16.9879 1.86485 17.2277L2.31875 16.3367C2.03699 16.1931 1.80753 15.9633 1.66349 15.6806L0.772489 16.1346ZM1.86478 17.2277C2.16073 17.3785 2.48067 17.4414 2.84468 17.4711C3.20288 17.5004 3.6462 17.5 4.19691 17.5V16.5C3.6297 16.5 3.23416 16.4996 2.92614 16.4744C2.62393 16.4497 2.45027 16.4037 2.31882 16.3367L1.86478 17.2277ZM4.19691 17.5H13.8036V16.5H4.19691V17.5ZM13.8036 17.5C14.3543 17.5 14.7974 17.5004 15.1554 17.4711C15.5193 17.4414 15.839 17.3785 16.1349 17.2277L15.6809 16.3367C15.5494 16.4037 15.3759 16.4497 15.0739 16.4744C14.7661 16.4996 14.3708 16.5 13.8036 16.5V17.5ZM16.1349 17.2277C16.6054 16.988 16.9882 16.6048 17.2277 16.1346L16.3367 15.6806C16.1928 15.963 15.963 16.193 15.6809 16.3367L16.1349 17.2277ZM17.2277 16.1346C17.3785 15.8387 17.4414 15.519 17.4711 15.155C17.5004 14.797 17.5 14.3538 17.5 13.8031H16.5C16.5 14.3703 16.4996 14.7657 16.4744 15.0735C16.4497 15.3755 16.4037 15.5491 16.3367 15.6806L17.2277 16.1346ZM17.5 13.8031V9H16.5V13.8031H17.5ZM17.5 9C17.5 8.54087 17.5002 8.17156 17.4798 7.87172C17.459 7.56739 17.4152 7.29836 17.3097 7.04358L16.3858 7.42622C16.4324 7.53894 16.4648 7.68652 16.4821 7.93988C16.4997 8.19774 16.5 8.52724 16.5 9H17.5ZM17.3096 7.04356C17.056 6.43109 16.5694 5.94408 15.9568 5.69027L15.574 6.61413C15.9414 6.76632 16.2334 7.05851 16.3858 7.42624L17.3096 7.04356ZM15.9567 5.69023C15.7018 5.58472 15.4327 5.54095 15.1283 5.52018C14.8285 5.49973 14.4591 5.5 14 5.5V6.5C14.4728 6.5 14.8023 6.50027 15.0603 6.51787C15.3137 6.53516 15.4614 6.56749 15.5741 6.61417L15.9567 5.69023ZM8.5 7V11H9.5V7H8.5ZM8.5 1V4H9.5V1H8.5ZM8.5 4V7H9.5V4H8.5Z"
                fill="black"
              />
            </svg>

            <span>Share</span>

            <div className="group-hover:block hidden absolute top-5 right-0 z-50">
              <ShareCard />
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              handleFavorite({ hotel: hotelInfo, hotel_id, isFavorite })
            }
            className="flex items-center gap-3 text-sm text-black font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill={isFavorite ? "yellow" : "black"}
            >
              <path
                d="M9.00001 2.65279L8.62055 2.97838C8.71554 3.08909 8.85414 3.15279 9.00001 3.15279C9.14588 3.15279 9.28447 3.08909 9.37946 2.97838L9.00001 2.65279ZM2.72376 1.91959L3.04796 2.30023L3.04797 2.30023L2.72376 1.91959ZM2.01136 8.49902L1.61703 8.80644L1.61703 8.80644L2.01136 8.49902ZM8.5777 14.8632L8.90865 14.4884L8.9086 14.4884L8.5777 14.8632ZM8.88018 15.0806L9.02264 14.6014L9.02252 14.6013L8.88018 15.0806ZM9.1089 15.0806L9.25119 15.56L9.25123 15.5599L9.1089 15.0806ZM9.41138 14.8632L9.74223 15.2381L9.74229 15.238L9.41138 14.8632ZM15.9777 8.49902L16.372 8.80645L16.372 8.80643L15.9777 8.49902ZM9.37946 2.32719C7.64318 0.303721 4.65976 -0.386125 2.39956 1.53894L3.04797 2.30023C4.79584 0.811532 7.1579 1.27381 8.62055 2.97838L9.37946 2.32719ZM2.39956 1.53894C0.194141 3.41733 -0.123327 6.57401 1.61703 8.80644L2.40569 8.19161C0.998472 6.38652 1.24529 3.8356 3.04796 2.30023L2.39956 1.53894ZM1.61703 8.80644C2.29871 9.68082 3.64417 11.0108 4.95589 12.245C6.2772 13.4882 7.5961 14.6636 8.24679 15.238L8.9086 14.4884C8.26142 13.917 6.95141 12.7495 5.64114 11.5167C4.32128 10.2748 3.03251 8.99563 2.40569 8.1916L1.61703 8.80644ZM8.24674 15.238C8.31346 15.2969 8.385 15.3606 8.45148 15.4105C8.52388 15.4648 8.61717 15.5241 8.73785 15.5599L9.02252 14.6013C9.05849 14.612 9.07312 14.6267 9.05173 14.6106C9.04052 14.6022 9.02432 14.5892 8.99937 14.5678C8.97438 14.5464 8.94577 14.5212 8.90865 14.4884L8.24674 15.238ZM8.73773 15.5599C8.90461 15.6095 9.08443 15.6095 9.25119 15.56L8.9666 14.6013C8.977 14.5982 8.98629 14.5971 8.99451 14.5971C9.00273 14.5971 9.01209 14.5982 9.02264 14.6014L8.73773 15.5599ZM9.25123 15.5599C9.37197 15.5241 9.46527 15.4647 9.53761 15.4104C9.60401 15.3606 9.67556 15.2969 9.74223 15.2381L9.08054 14.4883C9.04337 14.5211 9.01473 14.5464 8.9897 14.5678C8.96471 14.5892 8.9485 14.6023 8.93727 14.6107C8.91586 14.6268 8.93053 14.612 8.96656 14.6013L9.25123 15.5599ZM9.74229 15.238C10.393 14.6636 11.7119 13.4882 13.0332 12.245C14.3449 11.0108 15.6903 9.68082 16.372 8.80645L15.5834 8.1916C14.9565 8.99563 13.6678 10.2748 12.3479 11.5167C11.0377 12.7495 9.72766 13.917 9.08048 14.4884L9.74229 15.238ZM16.372 8.80643C18.108 6.5797 17.836 3.40018 15.5843 1.53456L14.9463 2.30461C16.7715 3.81684 16.995 6.38083 15.5834 8.19161L16.372 8.80643ZM15.5843 1.53456C13.2943 -0.362687 10.3605 0.299491 8.62055 2.32719L9.37946 2.97838C10.8385 1.27804 13.1592 0.824005 14.9463 2.30461L15.5843 1.53456Z"
                fill={isFavorite ? "yellow" : "black"}
              />
            </svg>

            <span>Save</span>
          </button>
        </div>
      </div>

      <p className="text-2xl lg:text-4xl font-semibold mb-6 text-black-800">
        {name}
      </p>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <StarIcon />
          <span className="text-sm text-black-800 font-medium">
            {star_rating}
          </span>
          {/* <span className="text-sm text-text-blar font-normal">(112)</span> */}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4"
          height="4"
          viewBox="0 0 4 4"
          fill="none"
        >
          <circle cx="2" cy="2" r="2" fill="black" />
        </svg>

        <div className="flex items-center gap-1.5">
          <MapIcon />

          <p className="text-base text-black font-normal">{address}</p>
        </div>
      </div>

      {/* <div className="flex items-center gap-2.5 pb-6 mb-6 border-b border-border-primary">
        <Image src={team} alt="image" className="w-11 h-11 rounded-full" />

        <p className="text-black text-base font-medium">
          <span className="text-text-blar">Hosted by </span> Kevin Francis
        </p>
      </div> */}

      {/* <div className="flex items-center flex-wrap gap-5 md:gap-14">
        <div className="flex items-center gap-3">
          <PeopleIcon />

          <p className="text-sm font-medium">6 guests</p>
        </div>

        <div className="flex items-center gap-3">
          <PeopleIcon />

          <p className="text-sm font-medium">6 guests</p>
        </div>

        <div className="flex items-center gap-3">
          <PeopleIcon />

          <p className="text-sm font-medium">6 guests</p>
        </div>

        <div className="flex items-center gap-3">
          <PeopleIcon />

          <p className="text-sm font-medium">6 guests</p>
        </div>
      </div> */}
    </div>
  );
};

export default DetailTopSection;
