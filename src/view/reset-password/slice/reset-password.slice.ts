import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resetPasswordApi = createApi({
  reducerPath: "resetPasswordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: (data: any) => ({
        url: "/public/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = resetPasswordApi;
