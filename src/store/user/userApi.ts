import { authActions } from "../auth/authSlice";
import { baseApi } from "../baseApi";
import type { GetMeRequest, GetMeResponse } from "./types";

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getMe: builder.query<GetMeResponse, GetMeRequest>({
			query: () => ({
				url: "/user",
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(authActions.setUser(data.data));
			},
		}),
	}),
});

export const { useGetMeQuery } = userApi;
