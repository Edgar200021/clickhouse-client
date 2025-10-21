import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { adminSlice } from "./admin/adminSlice";
import { authSlice } from "./auth/authSlice";
import { baseApi } from "./baseApi";
import { cartSlice } from "./cart/cartSlice";
import { categorySlice } from "./category/categorySlice";
import { productSkuSlice } from "./product-sku/productSkuSlice";

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		[authSlice.reducerPath]: authSlice.reducer,
		[productSkuSlice.reducerPath]: productSkuSlice.reducer,
		[categorySlice.reducerPath]: categorySlice.reducer,
		[cartSlice.reducerPath]: cartSlice.reducer,
		[adminSlice.reducerPath]: adminSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			baseApi.middleware,
		),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
