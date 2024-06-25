// import { MetaData } from "@/types/global.type";
// import { User } from "@/types/user.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelDetailApi = createApi({
  reducerPath: "hotelDetailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["hotel-detail"],
  endpoints: (builder) => ({
    getHotelDetail: builder.mutation({
      query: (data: any) => ({
        url: "/secured/search/hotel-info",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["hotel-detail"],
    }),
  }),
});

export const { useGetHotelDetailMutation } = hotelDetailApi;
