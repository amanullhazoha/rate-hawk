"use client";

import useSearchQueryParam from "@/lib/useSearchQueryParam";
import { useRouter, useSearchParams } from "next/navigation";

const SearchSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setQueryParams } = useSearchQueryParam();

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

  return (
    <section className="py-20 bg-yellow-bg">
      <div className="container mx-auto">
        <div className="w-[90%] mx-auto bg-white rounded-[20px] py-20 px-12">
          <div className="flex gap-5 flex-col">
            <div className="grid grid-cols-2 gap-4">
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
                    className="w-full outline-none"
                    placeholder="New York, United States"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="search"
                  className="text-base font-medium text-black-800"
                >
                  Check in - Check out
                </label>

                <div className="flex gap-3 border border-border-primary rounded-md px-3 py-2 mt-1">
                  <p>mm/dd/yy</p>-<p>mm/dd/yy</p>
                </div>
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
