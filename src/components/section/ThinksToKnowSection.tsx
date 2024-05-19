const ThinksToKnowSection = () => {
  return (
    <div className="p-8 border border-border-primary rounded-[20px]">
      <div>
        <h3 className="text-2xl font-semibold text-black">Things to know</h3>

        <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>
      </div>

      <p className="text-lg font-semibold text-black mb-4">
        Cancellation policy
      </p>

      <p className="text-base font-normal text-text-blar mb-2">
        Refund 50% of the booking value when customers cancel the room within 48
        hours after successful booking and 14 days before the check-in time.
      </p>
      <p className="text-base font-normal text-text-blar">
        Then, cancel the room 14 days before the check-in time, get a 50% refund
        of the total amount paid (minus the service fee).
      </p>

      <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>

      <p className="text-lg font-semibold text-black mb-4">
        Cancellation policy
      </p>

      <div className="p-3.5 rounded-md flex items-center justify-between bg-bg-primary w-1/2">
        <p>Check-in</p>
        <p>08:00am - 12:00 am</p>
      </div>

      <div className="p-3.5 rounded-md flex items-center justify-between bg-white w-1/2">
        <p>Check-out</p>
        <p>02:00 pm - 04:00 pm</p>
      </div>

      <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>

      <p className="text-lg font-semibold text-black mb-4">Special Note</p>

      <div className="mb-3 flex gap-4">
        <span className="w-2 h-2 rounded-[50%] bg-text-blar mt-1.5"></span>

        <p className="text-base font-normal text-text-blar w-[95%]">
          Then, cancel the room 14 days before the check-in time, get a 50%
          refund of the total amount paid (minus the service fee).
        </p>
      </div>

      <div className="flex gap-4">
        <span className="w-2 h-2 rounded-[50%] bg-text-blar mt-1.5"></span>

        <p className="text-base font-normal text-text-blar w-[95%]">
          Do not sing karaoke past 11:30
        </p>
      </div>
    </div>
  );
};

export default ThinksToKnowSection;
