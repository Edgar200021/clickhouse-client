import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Nullable } from "@/types/base";
import type { User } from "@/types/user";

export type AuthState = {
	// isAuthorized: boolean;
	user: Nullable<User>;
};

const initialState: AuthState = {
	// isAuthorized: false,
	user: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setIsAuthorized: (state, action: PayloadAction<boolean>) => {
			if (action.payload === false) {
				state.user = null;
			}
			// state.isAuthorized = action.payload;
		},
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
	},
	selectors: {
		// getIsAuthorized: (state) => state.isAuthorized,
		getUser: (state) => state.user,
	},
});

export const { selectors: authSelectors, actions: authActions } = authSlice;
