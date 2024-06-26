import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["hotel-detail"],
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data: any) => ({
        url: "/public/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["hotel-detail"],
    }),
  }),
});

export const { useUserLoginMutation } = loginApi;
