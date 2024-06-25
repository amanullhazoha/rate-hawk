"use client";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { hotelDetailApi } from "@/view/hotel-detail/slice";
import { searchHotelApi } from "@/view/search-hotel/slice";
// import { userApi } from "@/view/user/slice/user.slice";
// import { authApi } from "@/view/login/slice/auth.slice";
// import { orderApi } from "@/view/order/slice/order.slice";
// import { couponApi } from "@/view/coupon/slice/coupon.slice";
// import { profileApi } from "@/view/profile/slice/profile.slice";
// import { serviceApi } from "@/view/service/slice/service.slice";
// import { permissionApi } from "@/view/permission/slice/permission.slice";
// import { productBrandApi } from "@/view/product-brand/slice/productBrand.slice";
// import { productCategoryApi } from "@/view/product-category/slice/productCategory.slice";
// import { productTypeApi } from "@/view/product-type/slice/productType.slice";

const store = configureStore({
  reducer: {
    [hotelDetailApi.reducerPath]: hotelDetailApi.reducer,
    [searchHotelApi.reducerPath]: searchHotelApi.reducer,
    // [orderApi.reducerPath]: orderApi.reducer,
    // [couponApi.reducerPath]: couponApi.reducer,
    // [profileApi.reducerPath]: profileApi.reducer,
    // [serviceApi.reducerPath]: serviceApi.reducer,
    // [permissionApi.reducerPath]: permissionApi.reducer,
    // [productBrandApi.reducerPath]: productBrandApi.reducer,
    // [productCategoryApi.reducerPath]: productCategoryApi.reducer,
    // [productTypeApi.reducerPath]: productTypeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      hotelDetailApi.middleware,
      searchHotelApi.middleware,
      // orderApi.middleware,
      // couponApi.middleware,
      // profileApi.middleware,
      // serviceApi.middleware,
      // permissionApi.middleware,
      // productBrandApi.middleware,
      // productCategoryApi.middleware,
      // productTypeApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
