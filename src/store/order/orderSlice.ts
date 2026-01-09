import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetOrdersSchema } from "@/schemas/api/order/getOrders.schema";

type OrderState = {
	filters: GetOrdersSchema;
};

const initialState: OrderState = {
	filters: {},
};

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		clearFilters: (state) => {
			state.filters = initialState.filters;
		},
		setFilters: <K extends keyof OrderState["filters"]>(
			state: OrderState,
			{
				payload,
			}: PayloadAction<
				| {
						type: "single";
						key: K;
						val: OrderState["filters"][K];
				  }
				| { type: "multiple"; values: OrderState["filters"] }
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
		getFiltersStatus: (state) => state.filters.status,
		getFiltersLimit: (state) => state.filters.limit,
		getFiltersPage: (state) => state.filters.page,
	},
});

export const { selectors: orderSelectors, actions: orderActions } = orderSlice;
