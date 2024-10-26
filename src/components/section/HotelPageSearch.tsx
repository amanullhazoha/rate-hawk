"use client";

import { toast } from "react-toastify";
import RangeCalender from "../calender/RangeCalender";
import { countryData } from "@/assets/data/countryData";
import { childrenData } from "@/assets/data/childrenData";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { format, differenceInDays, addDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocationSearchMutation } from "@/view/home/slice";
import { useState, useEffect, useRef, ChangeEvent, useCallback } from "react";

const HotelPageSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [guest, setGuest] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const residencyRef = useRef<HTMLDivElement>(null);
  const { setQueryParams } = useSearchQueryParam();
  const [residency, setResidency] = useState<any>({
    name: "Netherlands",
    code: "nl",
  });
  const [star, setStar] = useState<any>(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [children, setChildren] = useState<any[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [selectDate, setSelectDate] = useState<any>(null);
  const [openChildren, setOpenChildren] = useState(false);
  const [openCalender, setOpenCalender] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [selectHotel, setSelectHotel] = useState<any>(null);
  const [openResidency, setOpenResidency] = useState(false);
  const [locationItem, setLocationItem] = useState<any>(null);
  const [locationSearch, { isLoading, data }] = useLocationSearchMutation();

  const handleSearchLocation = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setSearchLocation(event.target.value);

      const payload = {
        query: event.target.value,
        language: "en",
      };

      if (event.target.value) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setOpenSearch(true);
          locationSearch(payload);
        }, 1000);
      }
    },
    []
  );

  const handleSelect = useCallback((value: any) => {
    setOpenSearch(false);
    setSelectHotel(null);
    setLocationItem(value);
    setSearchLocation(value.name);
  }, []);

  const handleSelectHotel = useCallback((value: any) => {
    setOpenSearch(false);
    setLocationItem(null);
    setSelectHotel(value);
    setSearchLocation(value?.name);
  }, []);

  const handleDateRange = (dates: any) => {
    const date1 = new Date(dates[0].startDate);
    const date2 = new Date(dates[0].endDate);

    const daysDifference = differenceInDays(date2, date1);

    if (daysDifference >= 31) {
      return toast.error("You can't select more than 30.");
    }

    setSelectDate(dates);
  };

  const handleChildren = (item: any) => {
    const exists = children.some(
      (obj: any) => obj.value === item.value && obj.name === item.name
    );

    if (exists) {
      const filterData = children?.filter(
        (data: any) => data.value !== item.value
      );

      return setChildren(filterData);
    } else {
      if (children.length >= 4) {
        return toast.error("You can't select more than 4.");
      }

      const newData = [...children, item];
      setChildren(newData);
    }
  };

  const handleSearch = () => {
    const adults = guest;
    const language = "en";
    const currency = localStorage.getItem("currency")
      ? localStorage.getItem("currency")
      : "USD";
    const selectResidency = residency?.code;
    const region_id = locationItem ? locationItem?.id : null;
    const checkIn = selectDate
      ? format(new Date(selectDate[0]?.startDate), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd");
    const checkOut = selectDate
      ? format(new Date(selectDate[0]?.endDate), "yyyy-MM-dd")
      : format(addDays(new Date(), 1), "yyyy-MM-dd");

    if (!checkIn) return toast.error("Please select check in time.");
    if (!checkOut) return toast.error("Please select check out time.");
    if (!selectResidency) return toast.error("Please select your residency.");
    if (!region_id && locationItem)
      return toast.error("Please select area or hotel 1.");
    if (!locationItem && !selectHotel)
      return toast.error("Please select area or hotel.");
    if (!currency) return toast.error("Please select currency.");
    if (!adults) return toast.error("Please input adults.");

    let url: string = searchParams.toString();

    url = star && setQueryParams(url, "star", star);
    url = checkIn && setQueryParams(url, "check-in", checkIn);
    url = checkOut && setQueryParams(url, "check-out", checkOut);
    url = currency && setQueryParams(url, "currency", currency);
    url = language ? setQueryParams(url, "language", language) : url;
    url = adults > 0 ? setQueryParams(url, "adults", adults.toString()) : url;
    url = selectResidency && setQueryParams(url, "residency", selectResidency);
    url =
      children?.length > 0
        ? setQueryParams(
            url,
            "children",
            children?.map((item: any) => item.value).toString()
          )
        : url;

    if (locationItem) {
      url = region_id && setQueryParams(url, "region_id", region_id);
      url =
        locationItem && setQueryParams(url, "region_name", locationItem?.name);

      router.push(`/search-hotel${url ? `?${url}` : ""}`);
    }

    if (selectHotel) {
      router.push(`/hotel-detail/${selectHotel?.id}${url ? `?${url}` : ""}`);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef?.current?.contains(event.target as Node)) {
      setOpenCalender(false);
    }
  };

  useEffect(() => {
    if (data?.data?.data?.regions?.length > 0 && openSearch === false) {
      if (!locationItem) {
        setLocationItem(data?.data?.data?.regions[0]);
        setSearchLocation(data?.data?.data?.regions[0]?.name);
      }
    }
  }, [data, openSearch]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef?.current?.contains(event.target as Node)
      ) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        residencyRef.current &&
        !residencyRef?.current?.contains(event.target as Node)
      ) {
        setOpenResidency(false);
      }
    };

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

  return (
    <section>
      <div className="container mx-auto mb-6 ">
        <div className="mx-auto rounded-[20px]">
          <div className="flex gap-3 flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div ref={searchRef}>
                <div>
                  <label
                    htmlFor="search"
                    className="text-base font-medium text-black-800"
                  >
                    Destination
                  </label>

                  <div className="flex gap-3 border border-border-primary rounded-md px-3 py-2 mt-1">
                    <input
                      type="text"
                      id="search"
                      value={searchLocation}
                      onChange={handleSearchLocation}
                      className="w-full outline-none"
                      placeholder="New York, United States"
                    />
                  </div>
                </div>

                {openSearch && (
                  <div className="relative w-full">
                    <ul className="absolute top-2.5 left-0 right-0 shadow-md border border-border-primary bg-white px-3 py-3 rounded-md flex flex-col gap-2">
                      {data?.data?.data?.regions?.map((item: any) => (
                        <li
                          key={item?.id}
                          onClick={() => handleSelect(item)}
                          className="cursor-pointer hover:bg-slate-200"
                        >
                          {item?.name}
                        </li>
                      ))}

                      {data?.data?.data?.hotels?.map((item: any) => (
                        <li
                          key={item?.id}
                          onClick={() => handleSelectHotel(item)}
                          className="cursor-pointer"
                        >
                          {item?.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div ref={divRef}>
                <div onClick={() => setOpenCalender(true)}>
                  <label
                    htmlFor="search"
                    className="text-base font-medium text-black-800"
                  >
                    Check in - Check out
                  </label>

                  <div className="flex gap-3 border border-border-primary rounded-md px-3 py-2 mt-1">
                    <p>
                      {selectDate
                        ? format(
                            new Date(selectDate[0]?.startDate),
                            "yyyy-MM-dd"
                          )
                        : format(new Date(), "yyyy-MM-dd")}
                    </p>
                    -
                    <p>
                      {selectDate
                        ? format(new Date(selectDate[0]?.endDate), "yyyy-MM-dd")
                        : format(addDays(new Date(), 1), "yyyy-MM-dd")}
                    </p>
                  </div>
                </div>

                {openCalender && (
                  <div className="relative w-full">
                    <RangeCalender
                      className="absolute left-0 top-2.5 border border-border-primary"
                      handleDateRange={handleDateRange}
                    />
                  </div>
                )}
              </div>

              <div className="grid gap-3 grid-cols-3 items-end">
                <div className="col-span-2">
                  <label
                    htmlFor="search"
                    className="text-base font-medium text-black-800"
                  >
                    Guests
                  </label>

                  <div className="border border-border-primary rounded-md px-3 py-2 mt-1">
                    <div className="flex items-center gap-3 notranslate">
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
                        onClick={() => {
                          if (guest >= 6) {
                            return toast.error("You can't add more than 6.");
                          }

                          setGuest((prev) => prev + 1);
                        }}
                        className="bg-yellow-500 text-white px-2 rounded-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="w-full bg-primary-color rounded-lg py-2 text-xl font-semibold text-black-600"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="search"
                  className="text-base font-medium text-black-800"
                >
                  Guests
                </label>

                <div className="border border-border-primary rounded-md px-3 py-2 mt-1">
                  <div className="flex items-center gap-3 notranslate">
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
                      onClick={() => {
                        if (guest >= 6) {
                          return toast.error("You can't add more than 6.");
                        }

                        setGuest((prev) => prev + 1);
                      }}
                      className="bg-yellow-500 text-white px-2 rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-text-light">1 room - infront</p>
                </div>
              </div>

              <div ref={childrenRef}>
                <div onClick={() => setOpenChildren(true)}>
                  <label
                    htmlFor="search"
                    className="text-base font-medium text-black-800"
                  >
                    Children
                  </label>

                  <div className="border border-border-primary rounded-md px-3 py-2 mt-1">
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
                                  obj.name === item.name
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

              <div ref={residencyRef}>
                <div onClick={() => setOpenResidency(true)}>
                  <label
                    htmlFor="search"
                    className="text-base font-medium text-black-800"
                  >
                    Residency
                  </label>

                  <div className="border border-border-primary rounded-md px-3 py-2 mt-1">
                    <p>{residency ? residency?.name : "Select Residency"}</p>
                    <p className="text-xs text-text-light">1 room - infront</p>
                  </div>
                </div>

                {openResidency && (
                  <div className="relative w-full">
                    <ul className="absolute top-2.5 left-0 right-0 shadow-md border border-border-primary bg-white px-3 py-3 rounded-md flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                      {countryData?.map((item: any) => (
                        <li
                          key={item?.code}
                          onClick={() => {
                            setResidency(item);
                            setOpenResidency(false);
                          }}
                          className="cursor-pointer"
                        >
                          {item?.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div> */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="search"
                  className="text-base font-medium text-black-800"
                >
                  Hotel Star
                </label>

                <div className="flex items-center flex-wrap gap-1 mt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setStar((prev: any) => (prev === 1 ? null : 1))
                    }
                    className={`border border-border-primary rounded-md px-3 py-3 ${
                      star === 1 && "bg-yellow-200"
                    }`}
                  >
                    No star
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setStar((prev: any) => (prev === 2 ? null : 2))
                    }
                    className={`border border-border-primary rounded-md px-3 py-3 ${
                      star === 2 && "bg-yellow-200"
                    }`}
                  >
                    2 stars
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setStar((prev: any) => (prev === 3 ? null : 3))
                    }
                    className={`border border-border-primary rounded-md px-3 py-3 ${
                      star === 3 && "bg-yellow-200"
                    }`}
                  >
                    3 stars
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setStar((prev: any) => (prev === 4 ? null : 4))
                    }
                    className={`border border-border-primary rounded-md px-3 py-3 ${
                      star === 4 && "bg-yellow-200"
                    }`}
                  >
                    4 stars
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setStar((prev: any) => (prev === 5 ? null : 5))
                    }
                    className={`border border-border-primary rounded-md px-3 py-3 ${
                      star === 5 && "bg-yellow-200"
                    }`}
                  >
                    5 stars
                  </button>
                </div>
              </div>
            </div> */}

            {/* <button
              type="button"
              onClick={handleSearch}
              className="w-full bg-primary-color rounded-lg py-2 text-xl font-semibold text-black-600"
            >
              Search
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelPageSearch;
