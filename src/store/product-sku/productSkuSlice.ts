import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetProductsSkusSchema } from "@/schemas/api/productSku/getProductsSkus.schema";
import type { Combined } from "@/types/api";
import type { Nullable } from "@/types/base";
import type { Product, ProductSku } from "@/types/product";

export type CombinedProductSku = Combined<ProductSku, Product, "product">;

type ProductSkuState = {
	filters: GetProductsSkusSchema;
	productSku: Nullable<CombinedProductSku>;
};

const initialState: ProductSkuState = {
	filters: {},
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
				| { type: "multiple"; values: ProductSkuState["filters"] }
			>,
		) => {
			if (payload.type === "single") {
				state.filters[payload.key] = payload.val;
				return;
			}

			state.filters = { ...state.filters, ...payload.values };
		},
	},
	selectors: {
		getFilters: (state) => state.filters,
		getFiltersSearch: (state) => state.filters.search,
		getProductSku: (state) => state.productSku,
	},
});

export const { selectors: productSkuSelectors, actions: productSkuActions } =
	productSkuSlice;
