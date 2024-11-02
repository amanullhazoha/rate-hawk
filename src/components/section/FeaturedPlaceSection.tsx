// "use client";

// import { format, addDays } from "date-fns";
// import { useEffect, useState } from "react";
// import ProductCard from "../card/ProductCard";
// import { useGetUserAllSaveListQuery } from "@/view/save-list/slice";
// import {
//   useGetHotelDumpDataQuery,
//   useGetSearchHotelByIdsMutation,
// } from "@/view/search-hotel/slice/search-hotel.slice";
// import Preloader from "../loading/Preloader";

// const FeaturedPlaceSection = () => {
//   const [currency, setCurrency] = useState<string | null>(null);
//   const [region_id, setRegion_id] = useState(2621);

//   const { data: favoriteData } = useGetUserAllSaveListQuery("");
//   const {
//     data: hotelDumpData,
//     isLoading: isLoadingHotel,
//     refetch,
//   } = useGetHotelDumpDataQuery({ region_id, limit: 40 }, { skip: !region_id });

//   const [getHotelData, { isLoading: isGetHotelData, data: hotelData }] =
//     useGetSearchHotelByIdsMutation();

//   useEffect(() => {
//     if (region_id) {
//       refetch();
//     }
//   }, [region_id]);

//   useEffect(() => {
//     if (localStorage.getItem("currency")) {
//       setCurrency(localStorage.getItem("currency"));
//     }
//   }, []);

//   useEffect(() => {
//     if (hotelDumpData?.data?.length > 0) {
//       const payload = {
//         region_id,
//         residency: "nl",
//         language: "en",
//         checkin: format(new Date(), "yyyy-MM-dd"),
//         checkout: format(addDays(new Date(), 1), "yyyy-MM-dd"),
//         guests: [
//           {
//             adults: 1,
//             children: [],
//           },
//         ],
//         currency: currency ? currency : "USD",
//         ids: hotelDumpData?.data?.map((item: any) => item.id),
//       };

//       getHotelData(payload);
//     }
//   }, [hotelDumpData, currency]);

//   return (
//     <section className="py-12 md:py-[100px] bg-white">
//       <div className="container max-md:px-2.5 mx-auto overflow-hidden">
//         <div className="w-full md:w-[90%] mx-auto">
//           <div className="mb-7 mb:mb-14">
//             <h2 className="text-3xl md:text-[40px] font-semibold text-black-800 mb-3">
//               Featured places to stay
//             </h2>

//             <p className="text-base md:text-lg text-text-blar font-medium">
//               Popular places to stay that travelmeesters recommends for you
//             </p>
//           </div>

//           <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-3 mb-7 mb:mb-14">
//             <div className="flex gap-2 overflow-auto w-full md:w-fit">
//               <div>
//                 <button
//                   type="button"
//                   onClick={() => setRegion_id(2621)}
//                   className={`w-[140px] px-6 py-2 rounded-full text-base font-medium ${
//                     region_id === 2621
//                       ? "bg-primary-color text-black"
//                       : "text-black-400"
//                   }`}
//                 >
//                   New York
//                 </button>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setRegion_id(3593)}
//                 className={`w-[140px] px-6 py-2 rounded-full text-base font-medium ${
//                   region_id === 3593
//                     ? "bg-primary-color text-black"
//                     : "text-black-400"
//                 }`}
//               >
//                 Tokyo
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setRegion_id(2734)}
//                 className={`w-[140px] px-6 py-2 rounded-full text-base font-medium ${
//                   region_id === 2734
//                     ? "bg-primary-color text-black"
//                     : "text-black-400"
//                 }`}
//               >
//                 Paris
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setRegion_id(2114)}
//                 className={`w-[140px] px-6 py-2 rounded-full text-base font-medium ${
//                   region_id === 2114
//                     ? "bg-primary-color text-black"
//                     : "text-black-400"
//                 }`}
//               >
//                 London
//               </button>
//             </div>
//           </div>

//           {isLoadingHotel || isGetHotelData ? (
//             <div className="w-full flex justify-center items-center h-40">
//               <Preloader title="Data loading" />
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {hotelDumpData?.data?.map((item: any) => (
//                 <ProductCard
//                   product={item}
//                   key={item?.id}
//                   favoriteData={favoriteData?.data}
//                   hotelData={hotelData?.data?.data?.hotels}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedPlaceSection;

"use client";

import { format, addDays } from "date-fns";
import { useEffect, useState } from "react";
import ProductCard from "../card/ProductCard";
import Preloader from "../loading/Preloader";
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
  const [region_id, setRegion_id] = useState(2621);
  const [hotel_ids, setHotelIds] = useState<any>([]);
  const [dataByIds, setDataByIds] = useState<any>([]);
  const [currency, setCurrency] = useState<string | null>(null);

  const { data: favoriteData } = useGetUserAllSaveListQuery("");

  const {
    data: hotelDumpData,
    isLoading: isLoadingHotel,
    refetch,
  } = useGetHotelByRegionIdQuery({ region_id }, { skip: !region_id });

  const [fetchHotels] = useLazyGetSearchHotelByIdsQuery();

  useEffect(() => {
    if (region_id) {
      setDataByIds([]);
      setHotelIds([]);
      refetch();
    }
  }, [region_id]);

  useEffect(() => {
    if (localStorage.getItem("currency")) {
      setCurrency(localStorage.getItem("currency"));
    }
  }, []);

  // useEffect(() => {
  //   if (hotelDumpData?.data?.length > 0) {
  //     const payload = {
  //       region_id,
  //       residency: "nl",
  //       language: "en",
  //       checkin: format(new Date(), "yyyy-MM-dd"),
  //       checkout: format(addDays(new Date(), 1), "yyyy-MM-dd"),
  //       guests: [
  //         {
  //           adults: 1,
  //           children: [],
  //         },
  //       ],
  //       currency: currency ? currency : "USD",
  //       ids: hotelDumpData?.data?.map((item: any) => item.id),
  //     };

  //     getHotelData(payload);
  //   }
  // }, [hotelDumpData, currency]);

  useEffect(() => {
    const allHotetIds = hotelDumpData?.data?.data?.hotels?.map(
      (item: any) => item.id
    );

    if (allHotetIds?.length > 0) {
      setHotelIds(allHotetIds);
    }
  }, [hotelDumpData]);

  const chunkedHotelIds = chunkArray(hotel_ids.slice(0, 140), 140);

  useEffect(() => {
    const fetchHotelData = async () => {
      for (const idsChunk of chunkedHotelIds) {
        const response = await fetchHotels({ hotel_ids: idsChunk }).unwrap();

        if (response?.data?.length > 0) {
          setDataByIds((prevData: any) => [...prevData, ...response?.data]);
        }
      }
    };

    dataByIds?.length <= 40 && fetchHotelData();
  }, [region_id, hotel_ids, fetchHotels]);

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

          {isLoadingHotel ? (
            <div className="w-full flex justify-center items-center h-40">
              <Preloader title="Data loading" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dataByIds?.slice(0, 40)?.map((item: any) => (
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
