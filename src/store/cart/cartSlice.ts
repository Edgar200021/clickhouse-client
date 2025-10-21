import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetCartSchema } from "@/schemas/api/cart/getCart.schema";

type CartState = {
	filters: GetCartSchema;
};

const initialState: CartState = {
	filters: {},
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		clearFilters: (state) => {
			state.filters = initialState.filters;
		},
		setFilters: <K extends keyof CartState["filters"]>(
			state: CartState,
			{
				payload,
			}: PayloadAction<
				| {
						type: "single";
						key: K;
						val: CartState["filters"][K];
				  }
				| { type: "multiple"; values: CartState["filters"] }
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
		getFiltersCurrencyTo: (state) => state.filters.currencyTo,
	},
});

export const { selectors: cartSelectors, actions: cartActions } = cartSlice;
