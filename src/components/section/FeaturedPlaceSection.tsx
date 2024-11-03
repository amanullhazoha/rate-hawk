"use client";

import { format, addDays } from "date-fns";
import { useEffect, useState } from "react";
import Preloader from "../loading/Preloader";
import ProductCard from "../card/ProductCard";
import { useSearchParams } from "next/navigation";
import { useGetUserAllSaveListQuery } from "@/view/save-list/slice";
import {
  useGetHotelByRegionIdQuery,
  useLazyGetSearchHotelByIdsQuery,
} from "@/view/search-hotel/slice/search-hotel.slice";

function chunkArray(array: any, chunkSize: any) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

const FeaturedPlaceSection = () => {
  const searchParams = useSearchParams();
  const [region_id, setRegion_id] = useState(2621);
  const [hotel_ids, setHotelIds] = useState<any>([]);
  const [dataByIds, setDataByIds] = useState<any>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const currency: string | null = searchParams.get("currency");
  const [residency, setResidency] = useState<string | null>("nl");

  const skipQuery = !region_id || !residency;

  let filter: any = {
    currency: currency ? currency : "USD",
    residency,
    language: "en",
    hotels_limit: 150,
    checkin: format(new Date(), "yyyy-MM-dd"),
    checkout: format(addDays(new Date(), 2), "yyyy-MM-dd"),
  };

  if (region_id) {
    filter.region_id = region_id;
  }

  const [fetchHotels] = useLazyGetSearchHotelByIdsQuery();
  const { data: favoriteData } = useGetUserAllSaveListQuery("");

  const { data: hotelDumpData, isLoading: isLoadingHotel } =
    useGetHotelByRegionIdQuery(filter, { skip: skipQuery });

  useEffect(() => {
    const searchData = localStorage.getItem("searchData");

    if (searchData) {
      const parseData = JSON.parse(searchData);

      if (parseData) {
        setResidency(parseData?.residency?.code);
      }
    }
  }, []);

  useEffect(() => {
    if (region_id) {
      setDataByIds([]);
      // setHotelIds([]);
    }
  }, [region_id]);

  useEffect(() => {
    setDataByIds([]);
  }, [dataLoading]);

  useEffect(() => {
    const allHotetIds = hotelDumpData?.data?.data?.hotels?.map(
      (item: any) => item.id
    );

    if (allHotetIds?.length > 0) {
      setHotelIds(allHotetIds);
    }
  }, [hotelDumpData]);

  const chunkedHotelIds = chunkArray(hotel_ids, 140);

  useEffect(() => {
    setDataByIds([]);
    setDataLoading(true);

    const fetchHotelData = async () => {
      for (const idsChunk of chunkedHotelIds) {
        const response = await fetchHotels({ hotel_ids: idsChunk }).unwrap();

        if (response?.data?.length > 0) {
          const filterData = response.data?.filter(
            (item: any) => item.region?.id === Number(region_id)
          );

          setDataByIds(filterData);
          setDataLoading(false);
        }
      }
    };

    dataByIds?.length <= 40 && fetchHotelData();
  }, [hotel_ids, currency]);

  return (
    <section className="py-12 md:py-[100px] bg-white">
      <div className="container max-md:px-2.5 mx-auto overflow-hidden">
        <div className="w-full md:w-[90%] mx-auto">
          <div className="mb-7 mb:mb-14">
            <h2 className="text-3xl md:text-[40px] font-semibold text-black-800 mb-3">
              Featured places to stay
            </h2>

            <p className="text-base md:text-lg text-text-blar font-medium">
              Popular places to stay that travelmeesters recommends for you
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-3 mb-7 mb:mb-14">
            <div className="flex gap-2 overflow-auto w-full md:w-fit">
              <div>
                <button
                  type="button"
                  onClick={() => setRegion_id(2621)}
                  className={`w-[140px] px-6 py-2 rounded-full text-base font-medium ${
                    region_id === 2621
                      ? "bg-primary-color text-black"
                      : "text-black-400"
                  }`}
                >
                  New York
                </button>
              </div>

              <button
                type="button"
                onClick={() => setRegion_id(3593)}
                className={`w-[140px] px-6 py-2 rounded-full text-base font-medium ${
                  region_id === 3593
                    ? "bg-primary-color text-black"
                    : "text-black-400"
                }`}
              >
                Tokyo
              </button>

              <button
                type="button"
                onClick={() => setRegion_id(2734)}
                className={`w-[140px] px-6 py-2 rounded-full text-base font-medium ${
                  region_id === 2734
                    ? "bg-primary-color text-black"
                    : "text-black-400"
                }`}
              >
                Paris
              </button>

              <button
                type="button"
                onClick={() => setRegion_id(2114)}
                className={`w-[140px] px-6 py-2 rounded-full text-base font-medium ${
                  region_id === 2114
                    ? "bg-primary-color text-black"
                    : "text-black-400"
                }`}
              >
                London
              </button>
            </div>
          </div>

          {dataLoading ? (
            <div className="w-full flex justify-center items-center h-40">
              <Preloader title="Data loading" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dataByIds
                ?.filter(
                  (filterData: any) =>
                    filterData?.region?.id === Number(region_id)
                )
                ?.slice(0, 40)
                ?.map((item: any) => (
                  <ProductCard
                    product={item}
                    key={item?.id}
                    favoriteData={favoriteData?.data}
                    hotelData={hotelDumpData?.data?.data?.hotels}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlaceSection;
