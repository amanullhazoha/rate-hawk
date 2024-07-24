import KeyIcon from "@/assets/icons/KeyIcon";
import {
  PetIcon,
  PoolIcon,
  KidsIcon,
  RoomIcon,
  MealIcon,
  BeautyIcon,
  SportsIcon,
  GeneralIcon,
  ParkingIcon,
  LanguageIcon,
  TransferIcon,
  InternetIcon,
  BusinessIcon,
  ExtraServiceIcon,
} from "@/assets/ameniteIcon";

const amenitiesIcons = [
  { name: "General", icon: () => <GeneralIcon /> },
  { name: "Transfer", icon: TransferIcon },
  { name: "Services and amenities", icon: ExtraServiceIcon },
  { name: "Sports", icon: SportsIcon },
  { name: "Languages Spoken", icon: LanguageIcon },
  { name: "Beauty and wellness", icon: BeautyIcon },
  { name: "Parking", icon: ParkingIcon },
  { name: "Meals", icon: MealIcon },
  { name: "Kids", icon: KidsIcon },
  { name: "Rooms", icon: RoomIcon },
  { name: "Pool and beach", icon: PoolIcon },
  { name: "Pets", icon: PetIcon },
  { name: "Business", icon: BusinessIcon },
  { name: "Internet", icon: InternetIcon },
];

const AmenitiesSection = ({ amenity_groups }: { amenity_groups: any }) => {
  const getIcon = (name: string): JSX.Element | null => {
    const object = amenitiesIcons.find((item: any) => item.name === name);

    if (object) return object.icon();

    return <KeyIcon />;
  };

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 border border-border-primary rounded-[20px] mb-8">
      <div>
        <h3 className="text-2xl font-semibold text-black">Amenities</h3>

        <p className="text-base font-normal text-text-blar mt-2.5">
          About the property&apos;s amenities and services
        </p>

        <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenity_groups?.map((amenity: any, index: number) => (
          <div key={index} className="h-fit">
            <h4 className="flex items-center gap-3.5 mb-2">
              {getIcon(amenity?.group_name)}

              <p className="font-medium text-sm text-black">
                {amenity?.group_name}
              </p>
            </h4>

            <ul className="list-disc list-inside">
              {amenity?.amenities?.map((item: string, index: number) => (
                <li className="text-base px-2 py-.5 text-slate-600" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesSection;
