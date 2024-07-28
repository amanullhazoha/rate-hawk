import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const forgotPasswordApi = createApi({
  reducerPath: "forgotPasswordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (data: any) => ({
        url: "/public/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation } = forgotPasswordApi;
