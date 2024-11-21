import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import StarIcon from "@/assets/icons/StarIcon";
import { format, differenceInDays } from "date-fns";
import { useState, useRef, useEffect } from "react";
import RangeCalender from "../calender/RangeCalender";
import { childrenData } from "@/assets/data/childrenData";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCreateOrderMutation } from "@/view/hotel-detail/slice/hotel-detail.slice";

const ReserveCardSection = ({
  hotelInfo,
  selectRoom,
  originalRoom,
  setLoginView,
  setSelectRoom,
  setOriginalRoom,
}: {
  hotelInfo: any;
  selectRoom: any;
  originalRoom: any;
  setLoginView: (data: any) => void;
  setSelectRoom: (data: any) => void;
  setOriginalRoom: (data: any) => void;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const [guest, setGuest] = useState(0);
  const searchParams = useSearchParams();
  const divRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const [children, setChildren] = useState<any[]>([]);
  const [openCalender, setOpenCalender] = useState(false);
  const [openChildren, setOpenChildren] = useState(false);
  const { setQueryParams, deleteParams } = useSearchQueryParam();

  const [createOrder, { isLoading: isCreateLoading, data: orderData }] =
    useCreateOrderMutation();

  const adults: string | null = searchParams.get("adults");
  const checkIn: string | null = searchParams.get("check-in");
  const checkOut: string | null = searchParams.get("check-out");
  const childrenQuery: string | null = searchParams.get("children");
  const residency: string | null = searchParams.get("residency")
    ? searchParams.get("residency")
    : "nl";
  const currency: string | null = searchParams.get("currency")
    ? searchParams.get("currency")
    : "USD";

  const handleDateRange = (dates: any) => {
    const date1 = new Date(dates[0].startDate);
    const date2 = new Date(dates[0].endDate);

    const daysDifference = differenceInDays(date2, date1);

    if (daysDifference >= 31) {
      return toast.error("You can't select more than 30.");
    }

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
    setSelectRoom(null);
    setOriginalRoom(null);

    setOpenCalender(false);
  };

  const handleChildren = (item: any) => {
    let url: string = searchParams.toString();

    const exists = children.some(
      (obj: any) => obj.value === item.value && obj.name === item.name
    );

    if (exists) {
      const filterData = children?.filter(
        (data: any) => data.value !== item.value
      );

      url =
        filterData?.length > 0
          ? setQueryParams(
              url,
              "children",
              filterData?.map((item: any) => item.value).toString()
            )
          : url;

      setChildren(filterData);

      router.push(`${pathName}${url ? `?${url}` : ""}`);

      setSelectRoom(null);
      return setOriginalRoom(null);
    } else {
      if (children.length >= 4) {
        return toast.error("You can't select more than 4.");
      }

      const newData = [...children, item];
      setChildren(newData);

      url =
        newData?.length > 0
          ? setQueryParams(
              url,
              "children",
              newData?.map((item: any) => item.value).toString()
            )
          : url;

      router.push(`${pathName}${url ? `?${url}` : ""}`);

      setSelectRoom(null);
      setOriginalRoom(null);
    }
  };

  const handleGuest = (value: number) => {
    let url: string = searchParams.toString();

    url =
      Number(value) > 0 ? setQueryParams(url, "adults", value.toString()) : url;

    setGuest(value);

    router.push(`${pathName}${url ? `?${url}` : ""}`);

    setSelectRoom(null);
    setOriginalRoom(null);
  };

  const handleReserved = async () => {
    try {
      const payload = {
        language: "en",
        adults: guest,
        check_in: checkIn,
        room: originalRoom,
        currency: currency,
        check_out: checkOut,
        residency: residency,
        user_ip: "82.29.0.86",
        choose_room: selectRoom,
        kind: hotelInfo?.kind,
        hotel_id: hotelInfo?.id,
        partner_order_id: uuidv4(),
        address: hotelInfo?.address,
        hotel_name: hotelInfo?.name,
        book_hash: selectRoom?.book_hash,
        region_id: hotelInfo?.region?.id,
        star_rating: hotelInfo?.star_rating,
        region_name: hotelInfo?.region?.name,
        price_per_night: (
          Number(selectRoom?.daily_prices[0]) +
          Number(
            selectRoom?.payment_options?.payment_types?.[0]?.commission_info
              ?.show?.amount_commission
          ) /
            selectRoom?.daily_prices?.length
        ).toFixed(2),
        total_night: selectRoom?.daily_prices.length,
        total_amount: Number(
          selectRoom?.payment_options?.payment_types?.[0]?.commission_info?.show
            ?.amount_gross
        ),
        total_commission: Number(
          selectRoom?.payment_options?.payment_types?.[0]?.commission_info?.show
            ?.amount_commission
        ),
        children: childrenData?.filter((item: any) =>
          children.some(
            (obj: any) => obj.value === item.value && obj.name === item.name
          )
        ),
      };

      const data: any = await createOrder(payload);

      if (data?.data?.data?.data?.order_id) {
        router.push(`/reserve/${data?.data?.data?.data?.order_id}`);
      } else {
        if (data?.error?.originalStatus === 401) {
          toast.error("Please login or create an account first!");

          return setLoginView(true);

          // return setTimeout(() => {
          //   window.open(
          //     "http://localhost:3000/login",
          //     "_blank",
          //     "noopener,noreferrer"
          //   );
          // }, 3000);
        }

        toast.error(data?.error?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error.");
    }
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        childrenRef.current &&
        !childrenRef?.current?.contains(event.target as Node)
      ) {
        setOpenChildren(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (adults) {
      setGuest(Number(adults));
    }

    if (childrenQuery) {
      const arrayData = childrenQuery.split(",");

      const filterData = childrenData.filter((item) => {
        if (arrayData.includes(item.value)) return item;
      });

      setChildren(filterData);
    }
  }, []);

  return (
    <div className="p-6 shadow-shadow-primary border border-border-primary rounded-[20px]">
      {selectRoom?.daily_prices[0] && (
        <div className="w-full flex items-center justify-between mb-4">
          <div>
            <p className="text-xl font-medium text-black">
              {/* {localStorage.getItem("currency")} {selectRoom?.daily_prices[0]} */}
              {localStorage.getItem("currency")}{" "}
              {(
                Number(selectRoom?.daily_prices[0]) +
                Number(
                  selectRoom?.payment_options?.payment_types?.[0]
                    ?.commission_info?.show?.amount_commission
                ) /
                  selectRoom?.daily_prices?.length
              ).toFixed(2)}
              <sub className="text-sm font-normal text-black-400"> /night</sub>
            </p>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-border-primary mb-2">
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
                  className="absolute left-[-47px] top-2.5 border border-border-primary"
                  handleDateRange={handleDateRange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-border-primary"></div>

        <div className="grid grid-cols-1">
          <div>
            <div className="px-3 py-2">
              <label
                htmlFor="search"
                className="text-black text-lg font-semibold"
              >
                Guests
              </label>

              <div className="flex items-center gap-3 mt-1 notranslate">
                <button
                  type="button"
                  disabled={guest <= 0 ? true : false}
                  onClick={() => handleGuest(guest - 1)}
                  className="bg-yellow-500 text-white px-2 rounded-md"
                >
                  -
                </button>

                <p>{guest ? guest : "0"} Guests</p>

                <button
                  type="button"
                  onClick={() => {
                    if (guest >= 6) {
                      return toast.error("You can't add more than 6.");
                    }

                    handleGuest(guest + 1);
                  }}
                  className="bg-yellow-500 text-white px-2 rounded-md"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-text-light">1 room - infront</p>
            </div>
          </div>

          <div className="border-b border-border-primary"></div>

          <div ref={childrenRef}>
            <div onClick={() => setOpenChildren(true)}>
              {/* <label
                htmlFor="search"
                className="text-base font-medium text-black-800"
              >
                Children
              </label> */}

              <div className="px-3 py-2 mt-1">
                <p>{children.length} Children</p>
                <p className="text-xs text-text-light">1 room - infront</p>
              </div>
            </div>

            {openChildren && (
              <div className="relative w-full">
                <ul className="absolute top-2.5 left-0 right-0 shadow-md border border-border-primary bg-white px-3 py-3 rounded-md flex flex-col gap-2 max-h-[300px] overflow-y-auto z-[9999999]">
                  {childrenData?.map((item: any) => (
                    <li
                      key={item?.code}
                      onClick={() => handleChildren(item)}
                      className="cursor-pointer flex gap-2 items-center"
                    >
                      <input
                        type="checkbox"
                        checked={
                          children.some(
                            (obj: any) =>
                              obj.value === item.value && obj.name === item.name
                          )
                            ? true
                            : false
                        }
                      />
                      {item?.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectRoom && (
        <div className="flex justify-between items-center border-b border-border-primary pb-2 mt-3">
          <p className="text-text-blar text-base">
            {selectRoom?.daily_prices?.length} Night
          </p>

          <p className="text-text-blar text-base">
            {localStorage.getItem("currency")}{" "}
            {
              selectRoom?.payment_options?.payment_types?.[0]?.commission_info
                ?.show?.amount_gross
            }
          </p>
        </div>
      )}

      {selectRoom && (
        <div className="flex justify-between items-center mt-3">
          <p className="text-black font-medium text-base">Total</p>

          <p className="text-black font-medium text-base">
            {localStorage.getItem("currency")}{" "}
            {
              selectRoom?.payment_options?.payment_types?.[0]?.commission_info
                ?.show?.amount_gross
            }
          </p>
        </div>
      )}

      {selectRoom ? (
        <div className="w-full">
          <button
            type="button"
            onClick={handleReserved}
            className="px-10 py-2 w-full rounded-md bg-primary-color mt-4"
          >
            Reserve
          </button>
        </div>
      ) : (
        <div className="w-full">
          <button
            type="button"
            disabled={true}
            className="px-10 py-2 w-full rounded-md bg-yellow-200 mt-4"
          >
            Select A Room
          </button>
        </div>
      )}
    </div>
  );
};

export default ReserveCardSection;
