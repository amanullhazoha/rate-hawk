import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userProfileApi = createApi({
  reducerPath: "userProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getLoggedInProfile: builder.query({
      query: () => ({
        url: "/secured/user/profile",
      }),
    }),
    userProfileUpdate: builder.mutation({
      query: (data: any) => ({
        url: "/secured/user/profile",
        method: "PUT",
        body: data,
      }),
    }),
    userPasswordChange: builder.mutation({
      query: (data: any) => ({
        url: "/secured/user/change-password",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetLoggedInProfileQuery,
  useUserProfileUpdateMutation,
  useUserPasswordChangeMutation,
} = userProfileApi;
