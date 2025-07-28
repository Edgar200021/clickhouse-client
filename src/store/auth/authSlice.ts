import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Nullable } from "@/types/base";
import type { User } from "@/types/user";

export type AuthState = {
	user: Nullable<User>;
};

const initialState: AuthState = {
	user: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
	},
	selectors: {
		getUser: (state) => state.user,
	},
});

export const { selectors: authSelectors, actions: authActions } = authSlice;
