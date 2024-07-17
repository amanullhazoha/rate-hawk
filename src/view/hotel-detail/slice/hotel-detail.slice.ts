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
        url: "/public/search/hotel-info",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["hotel-detail"],
    }),
    getHotelBookHash: builder.mutation({
      query: (data: any) => ({
        url: "/public/search/hotel-hash-id",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["hotel-detail"],
    }),
    createOrder: builder.mutation({
      query: (data: any) => ({
        url: "/api/v1/secured/order/create",
        method: "POST",
        body: data,
      }),
    }),
    createStripePayment: builder.mutation({
      query: (data: any) => ({
        url: "/secured/stripe/payment",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetHotelDetailMutation,
  useGetHotelBookHashMutation,
  useCreateStripePaymentMutation,
} = hotelDetailApi;
