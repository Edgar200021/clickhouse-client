import { baseApi } from "../baseApi";
import { categoryActions } from "../category/categorySlice";
import type { RootState } from "../store";
import { adminActions } from "./adminSlice";
import type {
	BlockToggleRequest,
	BlockToggleResponse,
	CreateCategoryRequest,
	CreateCategoryResponse,
	CreateManufacturerRequest,
	CreateManufacturerResponse,
	DeleteCategoryRequest,
	DeleteCategoryResponse,
	DeleteManufacturerRequest,
	DeleteManufacturerResponse,
	GetManufacturerRequest,
	GetManufacturerResponse,
	GetManufacturersRequest,
	GetManufacturersResponse,
	GetUsersRequest,
	GetUsersResponse,
	UpdateCategoryRequest,
	UpdateCategoryResponse,
	UpdateManufacturerRequest,
	UpdateManufacturerResponse,
} from "./types";

export const adminApi = baseApi.injectEndpoints({
	// Categories
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

		deleteCategory: builder.mutation<
			DeleteCategoryResponse,
			DeleteCategoryRequest
		>({
			query: (body) => {
				return {
					url: `/admin/categories/${body.categoryId}`,
					method: "DELETE",
				};
			},
			onQueryStarted: async (arg, { dispatch, getState, queryFulfilled }) => {
				await queryFulfilled;
				dispatch(categoryActions.deleteCategory(arg.categoryId));
				dispatch(
					categoryActions.setCategories(
						(getState() as RootState).category.categories,
					),
				);
			},
		}),

		// Manufacturers
		getManufacturers: builder.query<
			GetManufacturersResponse,
			GetManufacturersRequest
		>({
			query: () => {
				return { url: "/admin/manufacturers" };
			},
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(adminActions.setManufacturers(data.data));
			},
		}),

		getManufacturer: builder.query<
			GetManufacturerResponse,
			GetManufacturerRequest
		>({
			query: (body) => {
				return { url: `/admin/manufacturers/${body.manufacturerId}` };
			},
		}),

		createManufacturer: builder.mutation<
			CreateManufacturerResponse,
			CreateManufacturerRequest
		>({
			query: (body) => {
				return {
					url: "/admin/manufacturers",
					method: "POST",
					body,
				};
			},
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(adminActions.setManufacturer(data.data));
			},
		}),

		updateManufacturer: builder.mutation<
			UpdateManufacturerResponse,
			UpdateManufacturerRequest
		>({
			query: (body) => {
				return {
					url: `/admin/manufacturers/${body.manufacturerId}`,
					method: "PATCH",
					body: { name: body.name },
				};
			},
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(adminActions.updateManufacturer(data.data));
			},
		}),

		deleteManufacturer: builder.mutation<
			DeleteManufacturerResponse,
			DeleteManufacturerRequest
		>({
			query: (body) => {
				return {
					url: `/admin/manufacturers/${body.manufacturerId}`,
					method: "DELETE",
				};
			},
			onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
				await queryFulfilled;
				dispatch(adminActions.deleteManufactory(arg.manufacturerId));
			},
		}),

		// Users
		getUsers: builder.query<GetUsersResponse, GetUsersRequest>({
			query: (body) => {
				return { url: "/admin/users", params: body };
			},
		}),

		blockToggle: builder.mutation<BlockToggleResponse, BlockToggleRequest>({
			query: (body) => ({
				url: `/admin/users/${body.userId}/block-toggle`,
				method: "PATCH",
				body: {
					type: body.type,
				},
			}),
			onQueryStarted: async (arg, { dispatch, queryFulfilled, getState }) => {
				await queryFulfilled;
				dispatch(
					adminApi.util.updateQueryData(
						"getUsers",
						(getState() as RootState).admin.usersFilters,
						(draft) => {
							const index = draft.data.users.findIndex(
								(u) => u.id === arg.userId,
							);
							if (index === -1) return;
							draft.data.users[index] = {
								...draft.data.users[index],
								isBanned: arg.type === "lock",
							};
						},
					),
				);
			},
		}),
	}),
});

export const {
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
	useLazyGetManufacturersQuery,
	useLazyGetManufacturerQuery,
	useCreateManufacturerMutation,
	useUpdateManufacturerMutation,
	useDeleteManufacturerMutation,
	useLazyGetUsersQuery,
	useBlockToggleMutation,
} = adminApi;
