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
import MetaPolicySection from "./MetaPolicySection";

const DetailSection = ({
  bookHash,
  hotelInfo,
  favoriteData,
  setLoginView,
}: {
  bookHash: any;
  hotelInfo: any;
  favoriteData: any;
  setLoginView: any;
}) => {
  const [selectRoom, setSelectRoom] = useState<any>(null);
  const [originalRoom, setOriginalRoom] = useState<any>(null);

  return (
    <div className="max-md:flex max-md:flex-col md:grid gap-4 md:gap-6 grid-cols-12">
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

        <RoomRateSection
          bookHash={bookHash}
          selectRoom={selectRoom}
          setOriginalRoom={setOriginalRoom}
          room_groups={hotelInfo?.room_groups}
          handleSelectRoom={(rate: any) => setSelectRoom(rate)}
        />

        <StayInfoSection description_struct={hotelInfo?.description_struct} />

        <AmenitiesSection amenity_groups={hotelInfo?.amenity_groups} />

        <MetaPolicySection metapolicy_struct={hotelInfo?.metapolicy_struct} />

        {/* <AvailabilitySection /> */}

        <ThinksToKnowSection
          policy_struct={hotelInfo?.policy_struct}
          check_in_time={hotelInfo?.check_in_time}
          check_out_time={hotelInfo?.check_out_time}
          metapolicy_extra_info={hotelInfo?.metapolicy_extra_info}
        />
      </div>

      <div className="w-full col-span-12 lg:col-span-4">
        <ReserveCardSection
          hotelInfo={hotelInfo}
          selectRoom={selectRoom}
          originalRoom={originalRoom}
          setLoginView={setLoginView}
          setSelectRoom={setSelectRoom}
          setOriginalRoom={setOriginalRoom}
        />
      </div>
    </div>
  );
};

export default DetailSection;
