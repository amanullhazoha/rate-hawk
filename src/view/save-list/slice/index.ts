import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userHotelSaveListApi = createApi({
  reducerPath: "userHotelSaveListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["add_favorite", "remove_favorite"],
  endpoints: (builder) => ({
    getUserAllSaveList: builder.query({
      query: () => ({
        url: "/secured/favorite",
      }),
      providesTags: ["add_favorite", "remove_favorite"],
    }),
    userAddFavorite: builder.mutation({
      query: (data: any) => ({
        url: "/secured/favorite",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["add_favorite"],
    }),
    userRemoveFavorite: builder.mutation({
      query: (id: string) => ({
        url: `/secured/favorite/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove_favorite"],
    }),
  }),
});

export const {
  useGetUserAllSaveListQuery,
  useUserAddFavoriteMutation,
  useUserRemoveFavoriteMutation,
} = userHotelSaveListApi;
