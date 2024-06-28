import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchHotelApi = createApi({
  reducerPath: "searchHotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["search-hotel"],
  endpoints: (builder) => ({
    getSearchHotel: builder.mutation({
      query: (data: any) => ({
        url: "/secured/search/hotel-by-region",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["search-hotel"],
    }),
    getHotelData: builder.mutation({
      query: (data: any) => ({
        url: "/secured/search/hotel-data",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["search-hotel"],
    }),
  }),
});

export const { useGetSearchHotelMutation, useGetHotelDataMutation } =
  searchHotelApi;
