import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { loadStripe } from "@stripe/stripe-js";
import StarIcon from "@/assets/icons/StarIcon";
import { useState, useRef, useEffect } from "react";
import RangeCalender from "../calender/RangeCalender";
import { childrenData } from "@/assets/data/childrenData";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  useCreateOrderMutation,
  useCreateStripePaymentMutation,
} from "@/view/hotel-detail/slice/hotel-detail.slice";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_API_STRIPE_PUBLIC_KEY as string,
);

const ReserveCardSection = ({
  hotelInfo,
  selectRoom,
  setSelectRoom,
}: {
  hotelInfo: any;
  selectRoom: any;
  setSelectRoom: (data: any) => void;
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

  const [
    createStripePayment,
    { isLoading: isPaymentLoading, data: paymentData },
  ] = useCreateStripePaymentMutation();
  const [createOrder, { isLoading: isCreateLoading, data: orderData }] =
    useCreateOrderMutation();

  const adults: string | null = searchParams.get("adults");
  const checkIn: string | null = searchParams.get("check-in");
  const checkOut: string | null = searchParams.get("check-out");
  const childrenQuery: string | null = searchParams.get("children");

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
    setSelectRoom(null);
  };

  const handleChildren = (item: any) => {
    const exists = children.some(
      (obj: any) => obj.value === item.value && obj.name === item.name,
    );

    if (exists) {
      const filterData = children?.filter(
        (data: any) => data.value !== item.value,
      );

      return setChildren(filterData);
    } else {
      const newData = [...children, item];
      setChildren(newData);
    }
  };

  const handleReserved = async () => {
    const payload = {
      language: "en",
      user_ip: "82.29.0.86",
      partner_order_id: uuidv4(),
      book_hash: selectRoom?.book_hash,
    };

    // const data: any = await createOrder(payload);

    console.log(payload);
  };

  // const handleReserved = async () => {
  //   const payload = {
  //     currency: searchParams.get("currency")
  //       ? searchParams.get("currency")
  //       : "USD",
  //     residency: searchParams.get("residency")
  //       ? searchParams.get("residency")
  //       : "nl",
  //     hotel_id: hotelInfo?.id,
  //     hotel_name: hotelInfo?.name,
  //     address: hotelInfo?.address,
  //     hash: selectRoom?.book_hash,
  //     star_rating: hotelInfo?.star_rating,
  //     checkIn: searchParams.get("check-out"),
  //     checkOut: searchParams.get("check-out"),
  //     total_night: selectRoom?.daily_prices.length,
  //     total_amount: Number(
  //       selectRoom?.payment_options?.payment_types?.[0]?.show_amount,
  //     ),
  //     adults: guest,
  //     children: children?.length,
  //   };

  //   const data: any = await createStripePayment(payload);

  //   if (data?.data?.id) {
  //     const stripe = await stripePromise;

  //     if (stripe) {
  //       await stripe.redirectToCheckout({ sessionId: data?.data?.id });
  //     }
  //   }
  // };

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
              {localStorage.getItem("currency")} {selectRoom?.daily_prices[0]}
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
                  className="absolute right-[-60px] top-2.5 border border-border-primary"
                  handleDateRange={handleDateRange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-border-primary"></div>

        {/* <div className="flex items-center gap-3 px-2.5 py-2.5">
          <StarIcon />

          <div>
            <p className="text-black text-lg font-semibold">4 Guests</p>
            <p className="text-text-blar text-base">Guests</p>
          </div>
        </div> */}

        <div className="grid grid-cols-1">
          <div>
            <div className="px-3 py-2">
              <label
                htmlFor="search"
                className="text-black text-lg font-semibold"
              >
                Guests
              </label>

              <div className="flex items-center gap-3 mt-1">
                <button
                  type="button"
                  disabled={guest <= 0 ? true : false}
                  onClick={() => setGuest((prev) => prev - 1)}
                  className="bg-yellow-500 text-white px-2 rounded-md"
                >
                  -
                </button>
                <p>{guest ? guest : "0"} Guests</p>
                <button
                  type="button"
                  onClick={() => setGuest((prev) => prev + 1)}
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
                <ul className="absolute top-2.5 left-0 right-0 shadow-md border border-border-primary bg-white px-3 py-3 rounded-md flex flex-col gap-2 max-h-[300px] overflow-y-auto">
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
                              obj.value === item.value &&
                              obj.name === item.name,
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
            {selectRoom?.daily_prices.length} Night
          </p>

          <p className="text-text-blar text-base">
            {localStorage.getItem("currency")}{" "}
            {selectRoom?.payment_options?.payment_types?.[0]?.show_amount}
          </p>
        </div>
      )}

      {selectRoom && (
        <div className="flex justify-between items-center mt-3">
          <p className="text-black font-medium text-base">Total</p>

          <p className="text-black font-medium text-base">
            {localStorage.getItem("currency")}{" "}
            {selectRoom?.payment_options?.payment_types?.[0]?.show_amount}
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
