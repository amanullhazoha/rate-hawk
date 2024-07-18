import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["login", "logout"],
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data: any) => ({
        url: "/public/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["login"],
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: "/secured/user/logout",
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["logout"],
    }),
    getLoggedInProfile: builder.query({
      query: () => ({
        url: "/secured/user/profile",
      }),
      providesTags: ["login", "logout"],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserLogoutMutation,
  useGetLoggedInProfileQuery,
} = loginApi;
