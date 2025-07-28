import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetProductsFiltersSchema } from "@/schemas/api/products/getProducts.schema";

type ProductState = {
	filters: GetProductsFiltersSchema;
};

const initialState: ProductState = {
	filters: { search: "" },
};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setFilters: (state, action: PayloadAction<GetProductsFiltersSchema>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
		clearFilters: (state) => {
			state.filters = initialState.filters;
		},
		setFiltersSearch: (
			state,
			action: PayloadAction<GetProductsFiltersSchema["search"]>,
		) => {
			state.filters.search = action.payload;
		},
	},
	selectors: {
		getFilters: (state) => state.filters,
		getFiltersSearch: (state) => state.filters.search,
	},
});

export const { selectors: productSelectors, actions: productActions } =
	productSlice;
