import AmenitiesSection from "./AmenitieSection";
import AvailabilitySection from "./AvailabilitySection";
import DetailTopSection from "./DetailTopSection";
import RoomRateSection from "./RoomRateSection";
import StayInfoSection from "./StayInfoSection";
import ThinksToKnowSection from "./ThinksToKnowSection";

const DetailSection = () => {
  return (
    <div className="flex gap-10 flex-wrap">
      <div className="w-full md:w-8/12">
        <DetailTopSection />
        <StayInfoSection />
        <AmenitiesSection />
        <RoomRateSection />
        <AvailabilitySection />
        <ThinksToKnowSection />
      </div>

      <div className="w-full md:w-4/12">
        <div className="p-6 shadow-shadow-primary border border-border-primary rounded-[20px]">
          <h1>Date section</h1>
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
