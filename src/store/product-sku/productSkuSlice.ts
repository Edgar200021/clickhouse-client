import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetProductsSkusSchema } from "@/schemas/api/productSku/getProductsSkus.schema";
import type { Combined } from "@/types/api";
import type { Nullable } from "@/types/base";
import type { Product, ProductSku } from "@/types/product";

export type CombinedProductSku = Combined<ProductSku, Product, "product">;

type ProductSkuState = {
	filters: GetProductsSkusSchema;
	lazyFilters: GetProductsSkusSchema;
	productSku: Nullable<CombinedProductSku>;
};

const initialState: ProductSkuState = {
	filters: {},
	lazyFilters: {},
	productSku: null,
};

export const productSkuSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setProductSku: (
			state,
			action: PayloadAction<Nullable<CombinedProductSku>>,
		) => {
			state.productSku = action.payload;
		},
		clearFilters: (state) => {
			state.filters = initialState.filters;
		},
		clearLazyFilters: (state) => {
			state.lazyFilters = initialState.lazyFilters;
		},
		setFilters: <K extends keyof ProductSkuState["filters"]>(
			state: ProductSkuState,
			{
				payload,
			}: PayloadAction<
				| {
						type: "single";
						key: K;
						val: ProductSkuState["filters"][K];
				  }
				| {
						type: "multiple";
						values: ProductSkuState["filters"];
						clearPrev?: boolean;
				  }
			>,
		) => {
			if (payload.type === "single") {
				state.filters[payload.key] = payload.val;
				return;
			}

			state.filters = payload.clearPrev
				? payload.values
				: { ...state.filters, ...payload.values };
		},

		setLazyFilters: <K extends keyof ProductSkuState["lazyFilters"]>(
			state: ProductSkuState,
			{
				payload,
			}: PayloadAction<
				| {
						type: "single";
						key: K;
						val: ProductSkuState["lazyFilters"][K];
				  }
				| { type: "multiple"; values: ProductSkuState["lazyFilters"] }
			>,
		) => {
			if (payload.type === "single") {
				state.lazyFilters[payload.key] = payload.val;
				return;
			}

			state.lazyFilters = { ...state.lazyFilters, ...payload.values };
		},
	},
	selectors: {
		getFilters: (state) => state.filters,
		getFiltersSearch: (state) => state.filters.search,
		getFiltersSortInStock: (state) => state.filters.inStock,
		getFiltersWithDiscount: (state) => state.filters.withDiscount,
		getFiltersMinPrice: (state) => state.filters.minPrice,
		getFiltersMaxPrice: (state) => state.filters.maxPrice,
		getFiltersMinSalePrice: (state) => state.filters.minSalePrice,
		getFiltersMaxSalePrice: (state) => state.filters.maxSalePrice,
		getFiltersSort: (state) => state.filters.sort,

		getLazyFilters: (state) => state.lazyFilters,
		getLazyFiltersSearch: (state) => state.lazyFilters.search,
		getLazyFiltersSortInStock: (state) => state.lazyFilters.inStock,
		getLazyFiltersWithDiscount: (state) => state.lazyFilters.withDiscount,
		getLazyFiltersMinPrice: (state) => state.lazyFilters.minPrice,
		getLazyFiltersMaxPrice: (state) => state.lazyFilters.maxPrice,
		getLazyFiltersMinSalePrice: (state) => state.lazyFilters.minSalePrice,
		getLazyFiltersMaxSalePrice: (state) => state.lazyFilters.maxSalePrice,
		getLazyFiltersSort: (state) => state.lazyFilters.sort,

		getProductSku: (state) => state.productSku,
	},
});

export const { selectors: productSkuSelectors, actions: productSkuActions } =
	productSkuSlice;
