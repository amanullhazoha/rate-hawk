import AmenitiesSection from "./AmenitieSection";
import DetailTopSection from "./DetailTopSection";
import RoomRateSection from "./RoomRateSection";
import StarIcon from "@/assets/icons/StarIcon";
import StayInfoSection from "./StayInfoSection";
import AvailabilitySection from "./AvailabilitySection";
import ThinksToKnowSection from "./ThinksToKnowSection";
import RangeCalender from "../calender/RangeCalender";
import ReserveCardSection from "./ReserveCardSection";

const DetailSection = ({
  bookHash,
  hotelInfo,
}: {
  bookHash: any;
  hotelInfo: any;
}) => {
  return (
    <div className="grid gap-10 grid-cols-12">
      <div className="w-full col-span-8">
        <DetailTopSection
          kind={hotelInfo?.kind}
          name={hotelInfo?.name}
          address={hotelInfo?.address}
          star_rating={hotelInfo?.star_rating}
        />
        <StayInfoSection description_struct={hotelInfo?.description_struct} />
        <AmenitiesSection amenity_groups={hotelInfo?.amenity_groups} />
        <RoomRateSection
          room_groups={hotelInfo?.room_groups}
          bookHash={bookHash}
        />

        {/* <AvailabilitySection /> */}

        <ThinksToKnowSection
          policy_struct={hotelInfo?.policy_struct}
          check_in_time={hotelInfo?.check_in_time}
          check_out_time={hotelInfo?.check_out_time}
        />
      </div>

      <div className="w-full col-span-4">
        <ReserveCardSection />
      </div>
    </div>
  );
};

export default DetailSection;
