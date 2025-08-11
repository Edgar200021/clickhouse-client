import { baseApi } from "../baseApi";
import { categoryActions } from "../category/categorySlice";
import type { RootState } from "../store";
import type {
	CreateCategoryRequest,
	CreateCategoryResponse,
	UpdateCategoryRequest,
	UpdateCategoryResponse,
} from "./types";

export const adminApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createCategory: builder.mutation<
			CreateCategoryResponse,
			CreateCategoryRequest
		>({
			query: (body) => {
				const formData = new FormData();

				for (const key in body) {
					//@ts-expect-error ...
					formData.append(key, body[key]);
				}

				return {
					url: "/admin/categories",
					method: "POST",
					body: formData,
				};
			},
			onQueryStarted: async (_, { dispatch, getState, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(categoryActions.setCategory(data.data));
				dispatch(
					categoryActions.setCategories(
						(getState() as RootState).category.categories,
					),
				);
			},
		}),

		updateCategory: builder.mutation<
			UpdateCategoryResponse,
			UpdateCategoryRequest
		>({
			query: (body) => {
				const formData = new FormData();

				for (const key in body) {
					if (!body[key as keyof UpdateCategoryRequest]) continue;
					//@ts-expect-error ...
					formData.append(key, body[key as keyof UpdateCategoryRequest]);
				}

				return {
					url: `/admin/categories/${body.categoryId}`,
					method: "PATCH",
					body: formData,
				};
			},
			onQueryStarted: async (_, { dispatch, getState, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(categoryActions.updateCategory(data.data));
				dispatch(
					categoryActions.setCategories(
						(getState() as RootState).category.categories,
					),
				);
			},
		}),
	}),
});

export const { useCreateCategoryMutation, useUpdateCategoryMutation } =
	adminApi;
