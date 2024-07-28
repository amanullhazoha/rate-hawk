import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data: any) => ({
        url: "/public/contact-us",
        method: "post",
        body: data,
      }),
    }),
    createNewsletter: builder.mutation({
      query: (data: any) => ({
        url: "/public/newsletter",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useCreateContactMutation, useCreateNewsletterMutation } =
  contactApi;
