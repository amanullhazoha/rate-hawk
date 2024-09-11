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
    getSearchHotelByIds: builder.mutation({
      query: (data: any) => ({
        url: "/public/search/hotel-by-ids",
        method: "POST",
        body: data,
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
  useGetSearchHotelByIdsMutation,
} = searchHotelApi;
