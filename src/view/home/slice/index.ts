import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const homePageApi = createApi({
  reducerPath: "homePageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: [""],
  endpoints: (builder) => ({
    locationSearch: builder.mutation({
      query: (data: any) => ({
        url: "/secured/search/multi-complete",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLocationSearchMutation } = homePageApi;
