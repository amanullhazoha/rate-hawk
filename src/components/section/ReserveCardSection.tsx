import { format } from "date-fns";
import StarIcon from "@/assets/icons/StarIcon";
import { useState, useRef, useEffect } from "react";
import RangeCalender from "../calender/RangeCalender";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const ReserveCardSection = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const divRef = useRef<HTMLDivElement>(null);
  const [openCalender, setOpenCalender] = useState(false);
  const { setQueryParams, deleteParams } = useSearchQueryParam();

  const checkIn: string | null = searchParams.get("check-in");
  const checkOut: string | null = searchParams.get("check-out");

  const handleDateRange = (dates: any) => {
    let url = searchParams.toString();

    const checkOut = format(dates[0].endDate, "yyyy-MM-dd");
    const checkIn = format(dates[0].startDate, "yyyy-MM-dd");

    url = checkIn
      ? setQueryParams(url, "check-in", checkIn)
      : deleteParams(url, "check-in");

    url = checkOut
      ? setQueryParams(url, "check-out", checkOut)
      : deleteParams(url, "check-out");

    router.push(`${pathName}${url ? `?${url}` : ""}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef?.current?.contains(event.target as Node)) {
      setOpenCalender(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 shadow-shadow-primary border border-border-primary rounded-[20px]">
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="text-xl font-medium text-black">
            $119
            <sub className="text-sm font-normal text-black-400"> /night</sub>
          </p>
        </div>

        <p className="flex items-center gap-1">
          <StarIcon className="w-4 h-4" />
          4.5
        </p>
      </div>

      <div className="rounded-lg border border-border-primary mt-4 mb-2">
        <div className="flex items-center gap-3 px-2.5 py-2.5">
          <StarIcon />

          <div ref={divRef}>
            <div onClick={() => setOpenCalender(true)}>
              <p className="text-black text-lg font-semibold">
                {checkIn && format(new Date(checkIn), "MMM dd")} -
                {checkOut && format(new Date(checkOut), "MMM dd")}
              </p>

              <p className="text-text-blar text-base">Check In - Check Out</p>
            </div>

            {openCalender && (
              <div className="relative w-full">
                <RangeCalender
                  className="absolute right-[-60px] top-2.5 border border-border-primary"
                  handleDateRange={handleDateRange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-border-primary"></div>

        <div className="flex items-center gap-3 px-2.5 py-2.5">
          <StarIcon />

          <div>
            <p className="text-black text-lg font-semibold">4 Guests</p>
            <p className="text-text-blar text-base">Guests</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-b border-border-primary pb-2 mt-3">
        <p className="text-text-blar text-base">3 Night</p>

        <p className="text-text-blar text-base">$357</p>
      </div>

      <div className="flex justify-between items-center mt-3">
        <p className="text-black font-medium text-base">Total</p>

        <p className="text-black font-medium text-base">$357</p>
      </div>

      <div className="w-full">
        <button
          type="button"
          className="px-10 py-2 w-full rounded-md bg-primary-color mt-4"
        >
          Reserve
        </button>
      </div>
    </div>
  );
};

export default ReserveCardSection;
