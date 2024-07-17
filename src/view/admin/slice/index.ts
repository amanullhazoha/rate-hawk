import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/secured/user",
      }),
    }),
    getOrderInfo: builder.mutation({
      query: (data: any) => ({
        url: "/secured/order/info",
        method: "post",
        body: data,
      }),
    }),
    // createNewsletter: builder.mutation({
    //   query: (data: any) => ({
    //     url: "/public/newsletter",
    //     method: "post",
    //     body: data,
    //   }),
    // }),
  }),
});

export const { useGetUserQuery, useGetOrderInfoMutation } = adminApi;
