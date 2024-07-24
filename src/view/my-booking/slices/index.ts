import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userOrderListApi = createApi({
  reducerPath: "userOrderListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: [""],
  endpoints: (builder) => ({
    getUserOrderList: builder.query({
      query: () => ({
        url: "/secured/user-order",
      }),
    }),
  }),
});

export const { useGetUserOrderListQuery } = userOrderListApi;
