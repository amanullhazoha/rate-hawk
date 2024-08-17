import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userOrderListApi = createApi({
  reducerPath: "userOrderListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    getUserOrderList: builder.query({
      query: ({ page }) => ({
        url: "/secured/user-order",
        params: { page, limit: 8 },
      }),
      providesTags: ["orders"],
    }),
    orderCancel: builder.mutation({
      query: (data: any) => ({
        url: "/secured/order/cancel",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useGetUserOrderListQuery, useOrderCancelMutation } =
  userOrderListApi;
