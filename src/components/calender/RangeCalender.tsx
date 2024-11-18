import { useEffect, useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import { useSearchParams } from "next/navigation";

const RangeCalender = ({
  className,
  handleDateRange,
}: {
  className?: string;
  handleDateRange: any;
}) => {
  const searchParams = useSearchParams();

  const [state, setState] = useState([
    {
      key: "selection",
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
    },
  ]);

  const handleSelect = (item: any) => {
    setState([item.selection]);

    setTimeout(() => {
      handleDateRange([item.selection]);
    }, 1500);
  };

  useEffect(() => {
    const getSearchData = localStorage.getItem("searchData");

    const searchData = getSearchData ? JSON.parse(getSearchData) : {};

    const checkIn = searchParams.get("check-in")
      ? searchParams.get("check-in")
      : searchData?.checkIn;
    const checkOut = searchParams.get("check-out")
      ? searchParams.get("check-out")
      : searchData?.checkOut;

    checkIn &&
      checkOut &&
      setState([
        {
          key: "selection",
          startDate: new Date(checkIn),
          endDate: new Date(checkOut),
        },
      ]);
  }, [searchParams]);

  return (
    <div className={`shadow-md ${className}`}>
      <DateRange
        months={1}
        ranges={state}
        minDate={new Date()}
        onChange={handleSelect}
        editableDateInputs={true}
        rangeColors={["#FBE200"]}
        showMonthAndYearPickers={false}
        moveRangeOnFirstSelection={false}
      />
    </div>
  );
};

export default RangeCalender;
