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
    getDashboardData: builder.query({
      query: () => ({
        url: "/secured/admin-dashboard",
      }),
    }),
    getUserOrderListForAdmin: builder.query({
      query: () => ({
        url: "/secured/all/order",
      }),
    }),
    getOrderInfo: builder.mutation({
      query: (data: any) => ({
        url: "/secured/order/info",
        method: "post",
        body: data,
      }),
    }),
    downloadHotelDumpData: builder.mutation({
      query: () => ({
        url: "/secured/dump-data/download",
        method: "post",
        body: {},
      }),
    }),
    uploadHotelJsonData: builder.mutation({
      query: (data: any) => ({
        url: "/secured/dump-data/upload",
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

export const {
  useGetUserQuery,
  useGetOrderInfoMutation,
  useGetDashboardDataQuery,
  useUploadHotelJsonDataMutation,
  useDownloadHotelDumpDataMutation,
  useGetUserOrderListForAdminQuery,
} = adminApi;
