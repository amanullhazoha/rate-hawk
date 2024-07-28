import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signUpApi = createApi({
  reducerPath: "signUpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    userSignUp: builder.mutation({
      query: (data: any) => ({
        url: "/public/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUserSignUpMutation } = signUpApi;
