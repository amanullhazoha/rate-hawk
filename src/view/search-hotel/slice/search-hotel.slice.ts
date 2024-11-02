import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchHotelApi = createApi({
  reducerPath: "searchHotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["search-hotel"],
  endpoints: (builder) => ({
    getHotelDumpData: builder.query({
      query: ({ region_id, page, star, limit }) => ({
        url: "/public/dump-hotel",
        params: { region_id, page, star, limit },
      }),
    }),
    getHotelByRegionId: builder.query({
      query: ({
        adults,
        checkin,
        children,
        currency,
        checkout,
        residency,
        region_id,
        hotels_limit,
      }) => ({
        url: "/public/hotels-by-region-id",
        params: {
          adults,
          checkin,
          checkout,
          children,
          currency,
          region_id,
          residency,
          hotels_limit,
        },
      }),
    }),
    getSearchHotelByIds: builder.query({
      query: ({ star, hotel_ids }) => ({
        url: "/public/dump-hotel-by-ids",
        params: {
          star,
          hotel_ids,
        },
      }),
    }),
    getSearchHotel: builder.mutation({
      query: (data: any) => ({
        url: "/public/search/hotel-by-region",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["search-hotel"],
    }),
    getHotelData: builder.mutation({
      query: (data: any) => ({
        url: "/public/search/hotel-data",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["search-hotel"],
    }),
    getUserOrderById: builder.query({
      query: ({ order_id }: { order_id: string }) => ({
        url: `/secured/user/order/${order_id}`,
      }),
    }),
  }),
});

export const {
  useGetHotelDataMutation,
  useGetHotelDumpDataQuery,
  useGetUserOrderByIdQuery,
  useGetSearchHotelMutation,
  useGetHotelByRegionIdQuery,
  useLazyGetSearchHotelByIdsQuery,
  // useGetSearchHotelByIdsQuery,
  // useGetSearchHotelByIdsMutation,
} = searchHotelApi;
