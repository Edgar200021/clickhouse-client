import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Manufacturer } from "@/types/manufacturer";
import type { GetUsersRequest } from "./types";

type AdminState = {
	manufacturers: Manufacturer[] | null;
	usersFilters: GetUsersRequest;
};

const initialState: AdminState = {
	manufacturers: null,
	usersFilters: {},
};

export const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		setManufacturers: (state, action: PayloadAction<Manufacturer[]>) => {
			state.manufacturers = action.payload;
		},
		setManufacturer: (state, action: PayloadAction<Manufacturer>) => {
			state.manufacturers?.push(action.payload);
		},
		updateManufacturer: (state, { payload }: PayloadAction<Manufacturer>) => {
			if (!state.manufacturers) return;

			const index = state.manufacturers.findIndex((c) => c.id === payload.id);
			if (index === -1) return;

			state.manufacturers[index] = payload;
		},

		deleteManufactory: (
			state,
			{ payload }: PayloadAction<Manufacturer["id"]>,
		) => {
			if (!state.manufacturers) return;

			const index = state.manufacturers.findIndex((c) => c.id === payload);
			if (index === -1) return;

			state.manufacturers.splice(index, 1);
		},
		setUsersFilters: <T extends keyof AdminState["usersFilters"]>(
			state: AdminState,
			{
				payload,
			}: PayloadAction<{
				key: T;
				val: AdminState["usersFilters"][T];
			}>,
		) => {
			state.usersFilters[payload.key] = payload.val;
		},
	},
	selectors: {
		getManufactories: (state) => state.manufacturers,
		getManufacturer: (state, id: Manufacturer["id"]) => {
			return state.manufacturers?.find((m) => m.id === id);
		},
		getUsersFilters: (state) => state.usersFilters,
		getUsersFiltersSerach: (state) => state.usersFilters.search,
		getUsersFiltersIsBanned: (state) => state.usersFilters.isBanned,
		getUsersFiltersIsVerified: (state) => state.usersFilters.isVerified,
		getUsersFiltersLimit: (state) => state.usersFilters.limit,
	},
});

export const { selectors: adminSelectors, actions: adminActions } = adminSlice;
