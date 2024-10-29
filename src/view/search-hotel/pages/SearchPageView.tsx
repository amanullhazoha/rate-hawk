"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSearchQueryParam from "@/lib/useSearchQueryParam";
import ProductCard from "../../../components/card/ProductCard";
import HotelPageSearch from "@/components/section/HotelPageSearch";
import { useGetUserAllSaveListQuery } from "@/view/save-list/slice";
import MultiMarkerLocation from "@/components/map/MultiMarkerLocation";
import GlobalPagination from "@/components/pagination/GlobalPagination";
import {
  useGetHotelByRegionIdQuery,
  useLazyGetSearchHotelByIdsQuery,
} from "../slice/search-hotel.slice";

function chunkArray(array: any, chunkSize: any) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

const SearchPageView = () => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const { setQueryParams } = useSearchQueryParam();
  const [hotel_ids, setHotelIds] = useState<any>([]);
  const [dataByIds, setDataByIds] = useState<any>([]);
  const [pageSize, setPageSize] = useState<number>(30);
  const star: string | null = searchParams.get("star");
  const activePage: string | null = searchParams.get("page");
  const region_id: string | null = searchParams.get("region_id");

  const skipQuery = !region_id;

  let filter: any = {
    limit: 30,
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

  const [fetchHotels] = useLazyGetSearchHotelByIdsQuery();

  const indexOfLastHotel = page * pageSize;
  const indexOfFirstHotel = indexOfLastHotel - pageSize;
  const currentHotels = dataByIds.slice(indexOfFirstHotel, indexOfLastHotel);

  const handlePagination = (value: number) => {
    if (value) {
      setPage(value);
    }
  };

  useEffect(() => {
    if (activePage) {
      setPage(Number(activePage));
    }
  }, []);

  useEffect(() => {
    const allHotetIds = hotelDumpData?.data?.data?.hotels?.map(
      (item: any) => item.id
    );

    if (allHotetIds?.length > 0) {
      setHotelIds(allHotetIds);
    }
  }, [hotelDumpData]);

  const chunkedHotelIds = chunkArray(hotel_ids, 10);

  useEffect(() => {
    const fetchHotelData = async () => {
      for (const idsChunk of chunkedHotelIds) {
        const response = await fetchHotels({ hotel_ids: idsChunk }).unwrap();

        if (response?.data?.length > 0) {
          setDataByIds((prevData: any) => [...prevData, ...response?.data]);
        }
      }
    };

    fetchHotelData();
  }, [hotel_ids, star, fetchHotels]);

  return (
    <main className="pb-10 bg-white">
      <div className="container mx-auto px-2.5 lg:px-[35px]">
        <div className="grid-cols-1 grid lg:grid-cols-1 sticky z-[999999] top-[87px] md:top-[128px] bg-white pt-2.5 md:pt-6">
          {/* <div className="shadow-md px-2 py-1 rounded-md w-fit mb-4 border border-blue-50">
            <Link href="/" className="mr-2 text-blue-500 font-medium">
              Home
            </Link>
            <span className="mr-2">{">"}</span>

            <span className="font-medium">Search</span>
          </div> */}

          <HotelPageSearch />

          {isHotelDumpLoading && (
            <div className="w-full h-auto flex justify-center items-center">
              <div className="w-full h-[10px] border-orange-500 rounded-[20px] bg-blue-300">
                <div className="h-[10px] rounded-[20px] bg-yellow-300 animate-loading"></div>
              </div>
            </div>
          )}
        </div>

        {hotelDumpData?.pagination?.totalItems <= 0 && (
          <div className="w-full text-center">
            <h3>No data found.</h3>
          </div>
        )}

        {currentHotels?.length > 0 && !isHotelDumpLoading && (
          <>
            <div className="grid-cols-1 grid lg:grid-cols-2 gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {currentHotels?.map((item: any) => (
                  <ProductCard
                    product={item}
                    key={item?.id}
                    favoriteData={favoriteData?.data}
                    hotelData={hotelDumpData?.data?.data?.hotels}
                  />
                ))}
              </div>

              <div className="relative">
                <div className="w-full lg:w-[50%] h-[400px] lg:h-full relative lg:fixed lg:right-0 lg:top-[247px]">
                  <MultiMarkerLocation hotelData={dataByIds} />
                </div>
              </div>
            </div>

            {dataByIds?.length > 30 && (
              <div className="mt-4 grid-cols-1 grid lg:grid-cols-2 gap-10">
                <GlobalPagination
                  page={page}
                  limit={pageSize}
                  total_element={dataByIds?.length}
                  handlePagination={(value: number) => handlePagination(value)}
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
