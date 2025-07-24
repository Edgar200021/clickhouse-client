import {
	type BaseQueryFn,
	createApi,
	type FetchArgs,
	type FetchBaseQueryError,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { authActions } from "./auth/authSlice";
import { API_BASE_URL } from "@/const/api";

const baseQuery = fetchBaseQuery({
	baseUrl: API_BASE_URL,
	credentials: "include",
});

const customBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);

	if (result.error?.status === 401) {
		api.dispatch(authActions.setUser(null));
		return result;
	}

	return result;
};

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		healthCheck: builder.query<string, null>({
			query: () => ({
				url: "/health",
			}),
		}),
	}),
	tagTypes: [],
});
