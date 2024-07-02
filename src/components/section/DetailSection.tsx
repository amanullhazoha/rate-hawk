import { useState } from "react";
import StarIcon from "@/assets/icons/StarIcon";
import StayInfoSection from "./StayInfoSection";
import RoomRateSection from "./RoomRateSection";
import AmenitiesSection from "./AmenitieSection";
import DetailTopSection from "./DetailTopSection";
import RangeCalender from "../calender/RangeCalender";
import ReserveCardSection from "./ReserveCardSection";
import AvailabilitySection from "./AvailabilitySection";
import ThinksToKnowSection from "./ThinksToKnowSection";

const DetailSection = ({
  bookHash,
  hotelInfo,
  favoriteData,
}: {
  bookHash: any;
  hotelInfo: any;
  favoriteData: any;
}) => {
  const [selectRoom, setSelectRoom] = useState<any>(null);

  return (
    <div className="max-md:flex max-md:flex-col md:grid gap-5 md:gap-10 grid-cols-12">
      <div className="w-full col-span-12 lg:col-span-8">
        <DetailTopSection
          hotelInfo={hotelInfo}
          kind={hotelInfo?.kind}
          name={hotelInfo?.name}
          hotel_id={hotelInfo?.id}
          favoriteData={favoriteData}
          address={hotelInfo?.address}
          star_rating={hotelInfo?.star_rating}
        />

        <StayInfoSection description_struct={hotelInfo?.description_struct} />

        <AmenitiesSection amenity_groups={hotelInfo?.amenity_groups} />

        <RoomRateSection
          bookHash={bookHash}
          selectRoom={selectRoom}
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

      <div className="w-full col-span-12 lg:col-span-4">
        <ReserveCardSection
          hotelInfo={hotelInfo}
          selectRoom={selectRoom}
          setSelectRoom={setSelectRoom}
        />
      </div>
    </div>
  );
};

export default DetailSection;
