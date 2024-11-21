"use client";

import { format, addDays } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../../components/card/ProductCard";
import HotelPageSearch from "@/components/section/HotelPageSearch";
import { useGetUserAllSaveListQuery } from "@/view/save-list/slice";
import MultiMarkerLocation from "@/components/map/MultiMarkerLocation";
import GlobalPagination from "@/components/pagination/GlobalPagination";
import {
  useGetHotelByRegionIdQuery,
  useLazyGetSearchHotelByIdsQuery,
} from "../slice/search-hotel.slice";
import { is } from "date-fns/locale";

function chunkArray(array: any, chunkSize: any) {
  const chunks = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

const SearchPageView = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [isSticky, setIsSticky] = useState(false);
  const [hotel_ids, setHotelIds] = useState<any>([]);
  const [dataByIds, setDataByIds] = useState<any>([]);
  const [pageSize, setPageSize] = useState<number>(30);
  const [dataLoading, setDataLoading] = useState(true);
  const [currentHotels, setCurrentHotels] = useState([]);
  const [chunkedHotelIds, setChunkedHotelIds] = useState<any>([]);

  const star: string | null = searchParams.get("star");
  const checkin: string | null = searchParams.get("check-in");
  const currency: string | null = searchParams.get("currency");
  const checkout: string | null = searchParams.get("check-out");
  const region_id: string | null = searchParams.get("region_id");
  const residency: string | null = searchParams.get("residency");

  const skipQuery = !region_id;

  let filter: any = {
    currency: currency ? currency : "USD",
    residency: residency ? residency : "nl",
    language: "en",
    checkin: checkin ? checkin : format(new Date(), "yyyy-MM-dd"),
    checkout: checkout
      ? checkout
      : format(addDays(new Date(), 2), "yyyy-MM-dd"),
  };

  if (star) {
    filter.star = star;
  }

  if (region_id) {
    filter.region_id = region_id;
  }

  const { data: favoriteData } = useGetUserAllSaveListQuery("");

  const { data: hotelDumpData, isLoading: isHotelDumpLoading } =
    useGetHotelByRegionIdQuery(filter, { skip: skipQuery });

  const [fetchHotels, { isLoading }] = useLazyGetSearchHotelByIdsQuery();

  const indexOfLastHotel = page * pageSize;
  const indexOfFirstHotel = indexOfLastHotel - pageSize;

  const handlePagination = (value: number) => {
    if (value) {
      setPage(value);
    }
  };

  useEffect(() => {
    setPage(1);
    setDataByIds([]);
    setDataLoading(true);
  }, [currency]);

  useEffect(() => {
    setPage(1);
    setHotelIds([]);
    setDataByIds([]);
    setCurrentHotels([]);
  }, [dataLoading]);

  useEffect(() => {
    setCurrentHotels(dataByIds.slice(indexOfFirstHotel, indexOfLastHotel));
  }, [indexOfFirstHotel, indexOfLastHotel, dataByIds]);

  useEffect(() => {
    setChunkedHotelIds(chunkArray(hotel_ids, 10));
  }, [hotel_ids]);

  useEffect(() => {
    const allHotetIds = hotelDumpData?.data?.data?.hotels?.map(
      (item: any) => item.id
    );

    if (allHotetIds?.length > 0) {
      setHotelIds(allHotetIds);
    }
  }, [hotelDumpData]);

  useEffect(() => {
    const abortController: any = new AbortController();

    setPage(1);
    setDataByIds([]);

    const fetchHotelData = async () => {
      for (const idsChunk of chunkedHotelIds) {
        const response = await fetchHotels({
          hotel_ids: idsChunk,
          star: Number(star),
        }).unwrap();

        if (response?.data?.length > 0) {
          setDataByIds((prevData: any) => [...prevData, ...response?.data]);
          setDataLoading(false);
        }
      }
    };

    fetchHotelData();

    return () => {
      abortController.abort();
    };
  }, [chunkedHotelIds, currency, region_id]);

  useEffect(() => {
    const handleScroll = () => {
      if (mapRef.current) {
        const mapTop = mapRef.current.getBoundingClientRect().top;

        if (mapTop <= 129) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="pb-10 bg-white">
      <div className="container mx-auto px-2.5 ">
        <div className="grid-cols-1 grid lg:grid-cols-1  pt-2.5 md:pt-6">
          {/* <div className="grid-cols-1 grid lg:grid-cols-1 sticky z-[9999999] top-[87px] md:top-[128px] bg-white pt-2.5 md:pt-6"> */}
          {/* <div className="shadow-md px-2 py-1 rounded-md w-fit mb-4 border border-blue-50">
            <Link href="/" className="mr-2 text-blue-500 font-medium">
              Home
            </Link>
            <span className="mr-2">{">"}</span>

            <span className="font-medium">Search</span>
          </div> */}

          <HotelPageSearch
            handleSearchingData={() => {
              setHotelIds([]);
              setDataLoading(true);
            }}
          />
        </div>

        {!dataLoading && hotelDumpData?.data?.data?.hotels?.length <= 0 && (
          <div className="w-full flex justify-center items-center h-[220px]">
            <h3 className="text-xl font-medium text-slate-400">
              No Data Found
            </h3>
          </div>
        )}

        {!dataLoading &&
          currentHotels?.filter(
            (item: any) => item.region?.id === Number(region_id)
          )?.length <= 0 && (
            <div className="w-full flex justify-center items-center h-[220px]">
              <h3 className="text-xl font-medium text-slate-400">
                Data Searching On Background
              </h3>
            </div>
          )}

        {dataLoading && (
          <div className="w-full h-auto flex justify-center items-center">
            <div className="w-full h-[10px] border-orange-500 rounded-[20px] bg-blue-300">
              <div className="h-[10px] rounded-[20px] bg-yellow-300 animate-loading"></div>
            </div>
          </div>
        )}

        {currentHotels?.filter(
          (item: any) => item.region?.id === Number(region_id)
        )?.length > 0 &&
          (!isHotelDumpLoading || !isLoading) && (
            <>
              <div className="grid-cols-1 grid lg:grid-cols-2 gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentHotels
                    ?.filter(
                      (item: any) => item.region?.id === Number(region_id)
                    )
                    ?.map((item: any) => (
                      <ProductCard
                        product={item}
                        key={item?.id}
                        favoriteData={favoriteData?.data}
                        hotelData={hotelDumpData?.data?.data?.hotels}
                      />
                    ))}
                </div>

                <div className="relative" ref={mapRef}>
                  {/* <div className="w-full lg:w-[50%] h-[400px] lg:h-full relative lg:fixed lg:right-0 lg:top-[247px]"> */}
                  <div
                    className={
                      isSticky
                        ? "w-full lg:w-[50%] h-[400px] lg:h-full relative lg:fixed lg:right-0 lg:top-[129px]"
                        : "w-full lg:w-[141%] h-[400px] lg:h-full relative lg:absolute lg:right-[-38%] lg:top-[0px] transition-all duration-500 ease-in-out"
                    }
                  >
                    <MultiMarkerLocation
                      hotelData={dataByIds?.filter(
                        (item: any) => item.region?.id === Number(region_id)
                      )}
                    />
                  </div>
                </div>
              </div>

              {dataByIds?.length > 30 && (
                <div className="mt-4 grid-cols-1 grid lg:grid-cols-2 gap-10">
                  <GlobalPagination
                    page={page}
                    limit={pageSize}
                    total_element={
                      dataByIds?.filter(
                        (item: any) => item?.region?.id === Number(region_id)
                      )?.length
                    }
                    handlePagination={(value: number) =>
                      handlePagination(value)
                    }
                  />
                </div>
              )}
            </>
          )}
      </div>
    </main>
  );
};

export default SearchPageView;
