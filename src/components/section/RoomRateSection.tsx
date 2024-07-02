import RoomCard from "../card/RoomCard";

const RoomRateSection = ({
  bookHash,
  room_groups,
  handleSelectRoom,
}: {
  bookHash: any;
  room_groups: any;
  handleSelectRoom: (rate: any) => void;
}) => {
  return (
    <div className="px-4 md:px-8 py-6 md:py-8 border border-border-primary rounded-[20px] mb-8">
      <div>
        <h3 className="text-2xl font-semibold text-black">Room Rates</h3>

        <p className="text-base font-normal text-text-blar mt-2.5">
          Prices may increase on weekends or holidays
        </p>

        <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>
      </div>

      <div className="flex gap-4 flex-col">
        {bookHash?.length > 0 &&
          room_groups?.map((room: any, index: any) => (
            <RoomCard
              room={room}
              key={index}
              images={room?.images}
              rates={bookHash[0]?.rates}
              handleSelectRoom={handleSelectRoom}
            />
          ))}
      </div>

      {/* <div className="p-3.5 rounded-md flex items-center justify-between bg-bg-primary">
        <p>Monday - Thursday</p>
        <p>$199</p>
      </div>

      <div className="p-3.5 rounded-md flex items-center justify-between bg-white">
        <p>Monday - Thursday</p>
        <p>$199</p>
      </div>
      <div className="p-3.5 rounded-md flex items-center justify-between bg-bg-primary">
        <p>Friday - Sunday</p>
        <p>$229</p>
      </div>
      <div className="p-3.5 rounded-md flex items-center justify-between bg-white">
        <p>Rent by month</p>
        <p>-8.73%</p>
      </div>
      <div className="p-3.5 rounded-md flex items-center justify-between bg-bg-primary">
        <p>Minimum number of nights</p>
        <p>1 night</p>
      </div>
      <div className="p-3.5 rounded-md flex items-center justify-between bg-white">
        <p>Max number of nights</p>
        <p>90 nights</p>
      </div> */}
    </div>
  );
};

export default RoomRateSection;
