"use client";

import { loginApi } from "@/view/login/slice";
import { signUpApi } from "@/view/sign-up/slice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { hotelDetailApi } from "@/view/hotel-detail/slice";
import { searchHotelApi } from "@/view/search-hotel/slice";
import { resetPasswordApi } from "@/view/reset-password/slice";
import { forgotPasswordApi } from "@/view/forgot-password/slice";
import { userProfileApi } from "@/view/profile/slice";
import { homePageApi } from "@/view/home/slice";

const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
    [homePageApi.reducerPath]: homePageApi.reducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    [hotelDetailApi.reducerPath]: hotelDetailApi.reducer,
    [searchHotelApi.reducerPath]: searchHotelApi.reducer,
    [resetPasswordApi.reducerPath]: resetPasswordApi.reducer,
    [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      signUpApi.middleware,
      homePageApi.middleware,
      userProfileApi.middleware,
      hotelDetailApi.middleware,
      searchHotelApi.middleware,
      resetPasswordApi.middleware,
      forgotPasswordApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;