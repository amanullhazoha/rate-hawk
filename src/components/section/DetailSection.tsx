import AmenitiesSection from "./AmenitieSection";
import DetailTopSection from "./DetailTopSection";
import RoomRateSection from "./RoomRateSection";
import StarIcon from "@/assets/icons/StarIcon";
import StayInfoSection from "./StayInfoSection";
import AvailabilitySection from "./AvailabilitySection";
import ThinksToKnowSection from "./ThinksToKnowSection";
import RangeCalender from "../calender/RangeCalender";
import ReserveCardSection from "./ReserveCardSection";
import { useState } from "react";

const DetailSection = ({
  bookHash,
  hotelInfo,
}: {
  bookHash: any;
  hotelInfo: any;
}) => {
  const [selectRoom, setSelectRoom] = useState<any>(null);

  console.log(selectRoom);
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
          bookHash={bookHash}
          room_groups={hotelInfo?.room_groups}
          handleSelectRoom={(rate: any) => setSelectRoom(rate)}
        />

        {/* <AvailabilitySection /> */}

        <ThinksToKnowSection
          policy_struct={hotelInfo?.policy_struct}
          check_in_time={hotelInfo?.check_in_time}
          check_out_time={hotelInfo?.check_out_time}
        />
      </div>

      <div className="w-full col-span-4">
        <ReserveCardSection
          selectRoom={selectRoom}
          setSelectRoom={setSelectRoom}
        />
      </div>
    </div>
  );
};

export default DetailSection;
