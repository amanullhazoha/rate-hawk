import KeyIcon from "@/assets/icons/KeyIcon";

const AmenitiesSection = () => {
  return (
    <div className="p-8 border border-border-primary rounded-[20px] mb-8">
      <div>
        <h3 className="text-2xl font-semibold text-black">Amenities</h3>

        <p className="text-base font-normal text-text-blar mt-2.5">
          About the property's amenities and services
        </p>

        <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <div className="flex items-center gap-3.5">
          <KeyIcon />
          <p className="font-medium text-sm text-black">la-key</p>
        </div>

        <div className="flex items-center gap-3.5">
          <KeyIcon />
          <p className="font-medium text-sm text-black">la-key</p>
        </div>

        <div className="flex items-center gap-3.5">
          <KeyIcon />
          <p className="font-medium text-sm text-black">la-key</p>
        </div>

        <div className="flex items-center gap-3.5">
          <KeyIcon />
          <p className="font-medium text-sm text-black">la-key</p>
        </div>

        <div className="flex items-center gap-3.5">
          <KeyIcon />
          <p className="font-medium text-sm text-black">la-key</p>
        </div>

        <div className="flex items-center gap-3.5">
          <KeyIcon />
          <p className="font-medium text-sm text-black">la-key</p>
        </div>

        <div className="flex items-center gap-3.5">
          <KeyIcon />
          <p className="font-medium text-sm text-black">la-key</p>
        </div>

        <div className="flex items-center gap-3.5">
          <KeyIcon />
          <p className="font-medium text-sm text-black">la-key</p>
        </div>

        <div className="flex items-center gap-3.5">
          <KeyIcon />
          <p className="font-medium text-sm text-black">la-key</p>
        </div>

        <div className="flex items-center gap-3.5">
          <KeyIcon />
          <p className="font-medium text-sm text-black">la-key</p>
        </div>

        <div className="flex items-center gap-3.5">
          <KeyIcon />
          <p className="font-medium text-sm text-black">la-key</p>
        </div>

        <div className="flex items-center gap-3.5">
          <KeyIcon />
          <p className="font-medium text-sm text-black">la-key</p>
        </div>
      </div>

      <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>

      <button
        type="button"
        className="text-base text-semi-primary font-medium px-7 py-3 rounded-full border border-semi-primary"
      >
        View more 20 amenities
      </button>
    </div>
  );
};

export default AmenitiesSection;
