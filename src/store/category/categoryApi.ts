import { baseApi } from "../baseApi";
import { categoryActions } from "./categorySlice";
import type { GetCategoriesRequest, GetCategoriesResponse } from "./types";

export const categoryApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query<GetCategoriesResponse, GetCategoriesRequest>({
			query: () => ({
				url: "/categories",
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(categoryActions.setCategories(data.data));
			},
		}),
	}),
});

export const { useGetCategoriesQuery, useLazyGetCategoriesQuery } = categoryApi;
