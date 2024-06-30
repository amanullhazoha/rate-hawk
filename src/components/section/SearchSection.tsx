"use client";

import { format } from "date-fns";
import RangeCalender from "../calender/RangeCalender";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocationSearchMutation } from "@/view/home/slice";
import { useState, useEffect, useRef, ChangeEvent, useCallback } from "react";

const SearchSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const divRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { setQueryParams } = useSearchQueryParam();
  const [selectDate, setSelectDate] = useState(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [openCalender, setOpenCalender] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
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
    [],
  );

  const handleDateRange = (dates: any) => {
    console.log(dates);
    setSelectDate(dates);
  };

  const handleSearch = () => {
    const checkIn = "2024-06-25";
    const checkOut = "2024-06-26";
    const residency = "gb";
    const language = "en";
    const region_id = "1798";
    const currency = "USD";
    const adults = "2";

    let url = searchParams.toString();

    url = checkIn && setQueryParams(url, "check-in", checkIn);
    url = checkOut && setQueryParams(url, "check-out", checkOut);
    url = residency && setQueryParams(url, "residency", residency);
    url = language && setQueryParams(url, "language", language);
    url = region_id && setQueryParams(url, "region_id", region_id);
    url = currency && setQueryParams(url, "currency", currency);
    url = adults && setQueryParams(url, "adults", adults);

    router.push(`/search-hotel${url ? `?${url}` : ""}`);
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

  return (
    <section className="py-20 bg-yellow-bg">
      <div className="container mx-auto">
        <div className="w-[90%] mx-auto bg-white rounded-[20px] py-20 px-12">
          <div className="flex gap-5 flex-col">
            <div className="grid grid-cols-2 gap-4">
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
                        <li key={item?.id}>{item?.name}</li>
                      ))}

                      {data?.data?.data?.hotels?.map((item: any) => (
                        <li key={item?.id}>{item?.name}</li>
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
                            "yyyy-MM-dd",
                          )
                        : "yyyy-mm-dd"}
                    </p>
                    -
                    <p>
                      {selectDate
                        ? format(new Date(selectDate[0]?.endDate), "yyyy-MM-dd")
                        : "yyyy-mm-dd"}
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
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="search"
                  className="text-base font-medium text-black-800"
                >
                  Rooms
                </label>

                <div className="border border-border-primary rounded-md px-3 py-2 mt-1">
                  <p>2 Guests</p>
                  <p className="text-xs text-text-light">1 room - infront</p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="search"
                  className="text-base font-medium text-black-800"
                >
                  Children
                </label>

                <div className="border border-border-primary rounded-md px-3 py-2 mt-1">
                  <p>2 Guests</p>
                  <p className="text-xs text-text-light">1 room - infront</p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="search"
                  className="text-base font-medium text-black-800"
                >
                  Resindency
                </label>

                <div className="border border-border-primary rounded-md px-3 py-2 mt-1">
                  <p>2 Guests</p>
                  <p className="text-xs text-text-light">1 room - infront</p>
                </div>
              </div>
            </div>

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
    </section>
  );
};

export default SearchSection;
