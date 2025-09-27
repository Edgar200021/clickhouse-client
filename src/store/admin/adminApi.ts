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
	CreateProductRequest,
	CreateProductResponse,
	CreateProductSkuRequest,
	CreateProductSkuResponse,
	CreatePromocodeRequest,
	CreatePromocodeResponse,
	DeleteCategoryRequest,
	DeleteCategoryResponse,
	DeleteManufacturerRequest,
	DeleteManufacturerResponse,
	DeleteProductRequest,
	DeleteProductResponse,
	DeleteProductSkuRequest,
	DeleteProductSkuResponse,
	DeletePromocodeRequest,
	DeletePromocodeResponse,
	GetManufacturerRequest,
	GetManufacturerResponse,
	GetManufacturersRequest,
	GetManufacturersResponse,
	GetProductRequest,
	GetProductResponse,
	GetProductSkuRequest,
	GetProductSkuResponse,
	GetProductsRequest,
	GetProductsResponse,
	GetProductsSkusAdminRequest,
	GetProductsSkusAdminResponse,
	GetPromocodeRequest,
	GetPromocodeResponse,
	GetPromocodesRequest,
	GetPromocodesResponse,
	GetUsersRequest,
	GetUsersResponse,
	RemoveProductAssemblyInstructionRequest,
	RemoveProductAssemblyInstructionResponse,
	RemoveProductSkuImageRequest,
	RemoveProductSkuImageResponse,
	RemoveProductSkuPackageRequest,
	RemoveProductSkuPackageResponse,
	UpdateCategoryRequest,
	UpdateCategoryResponse,
	UpdateManufacturerRequest,
	UpdateManufacturerResponse,
	UpdateProductRequest,
	UpdateProductResponse,
	UpdateProductSkuRequest,
	UpdateProductSkuResponse,
	UpdatePromocodeRequest,
	UpdatePromocodeResponse,
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

		// Products

		getProducts: builder.query<GetProductsResponse, GetProductsRequest>({
			query: (body) => {
				return { url: "/admin/products", params: body };
			},
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(adminActions.setProducts(data.data.products));
			},
		}),

		getProduct: builder.query<GetProductResponse, GetProductRequest>({
			query: (body) => {
				return { url: `/admin/products/${body.productId}` };
			},
		}),

		createProduct: builder.mutation<
			CreateProductResponse,
			CreateProductRequest
		>({
			query: (body) => {
				const formData = new FormData();

				for (const key in body) {
					//@ts-expect-error ...
					formData.append(key, body[key]);
				}

				return {
					url: `/admin/products`,
					method: "POST",
					body: formData,
				};
			},
			onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(adminActions.setProduct(data.data));
			},
		}),

		updateProduct: builder.mutation<
			UpdateProductResponse,
			UpdateProductRequest
		>({
			query: (body) => {
				const formData = new FormData();

				for (const key in body) {
					if (!body[key as keyof UpdateProductRequest]) continue;
					//@ts-expect-error ...
					formData.append(key, body[key as keyof UpdateProductRequest]);
				}

				return {
					url: `/admin/products/${body.productId}`,
					method: "PATCH",
					body: formData,
				};
			},
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(adminActions.updateProduct(data.data));
			},
		}),

		deleteProduct: builder.mutation<
			DeleteProductResponse,
			DeleteProductRequest
		>({
			query: ({ productId }) => ({
				url: `/admin/products/${productId}`,
				method: "DELETE",
			}),
			onQueryStarted: async (arg, { dispatch, queryFulfilled, getState }) => {
				await queryFulfilled;
				dispatch(
					adminApi.util.updateQueryData(
						"getProducts",
						(getState() as RootState).admin.productFilters,
						(draft) => {
							const index = draft.data.products.findIndex(
								(p) => p.id === arg.productId,
							);
							if (index === -1) return;
							draft.data.products[index] = {
								...draft.data.products[index],
								isDeleted: true,
							};
						},
					),
				);
			},
		}),

		deleteProductAssemblyInstruction: builder.mutation<
			RemoveProductAssemblyInstructionResponse,
			RemoveProductAssemblyInstructionRequest
		>({
			query: ({ productId, fileId }) => {
				return {
					url: `/admin/products/${productId}/assembly-instruction`,
					method: "DELETE",
					body: {
						fileId,
					},
				};
			},
			onQueryStarted: async (arg, { dispatch, queryFulfilled, getState }) => {
				await queryFulfilled;
				dispatch(
					adminApi.util.updateQueryData(
						"getProducts",
						(getState() as RootState).admin.productFilters,
						(draft) => {
							const index = draft.data.products.findIndex(
								(p) => p.id === arg.productId,
							);
							if (index === -1) return;
							draft.data.products[index] = {
								...draft.data.products[index],
								assemblyInstructionFileId: null,
								assemblyInstructionFileUrl: null,
							};
						},
					),
				);
			},
		}),

		getProductsSkus: builder.query<
			GetProductsSkusAdminResponse,
			GetProductsSkusAdminRequest
		>({
			query: (params) => {
				return { url: "/admin/products-sku", params };
			},
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(adminActions.setProductsSkus(data.data.productsSkus));
			},
		}),

		getProductSkuAdmin: builder.query<
			GetProductSkuResponse,
			GetProductSkuRequest
		>({
			query: (body) => {
				return { url: `/admin/products-sku/${body.productSkuId}` };
			},
			providesTags: ["productSku"],
		}),

		createProductSku: builder.mutation<
			CreateProductSkuResponse,
			CreateProductSkuRequest
		>({
			query: (body) => {
				const formData = new FormData();

				for (const key in body) {
					//@ts-expect-error ...
					if (!body[key]) continue;

					if ((key as keyof CreateProductSkuRequest) === "images") {
						const images = body.images;

						for (const { file } of images) {
							formData.append(key, file);
						}

						continue;
					}

					if ((key as keyof CreateProductSkuRequest) === "packages") {
						//@ts-expect-error ...
						for (const pkg of body.packages) {
							const { id, ...rest } = pkg;
							formData.append(key, JSON.stringify(rest));
						}

						continue;
					}

					const value = body[key as keyof CreateProductSkuRequest];
					if (value !== undefined && value !== null) {
						formData.append(key, value as string);
					}
				}

				return {
					url: `/admin/products-sku`,
					method: "POST",
					body: formData,
				};
			},
		}),

		updateProductSku: builder.mutation<
			UpdateProductSkuResponse,
			UpdateProductSkuRequest
		>({
			query: (body) => {
				const formData = new FormData();

				for (const key in body) {
					//@ts-expect-error ...
					if (!body[key]) continue;

					if (
						(key as keyof UpdateProductSkuRequest) === "images" &&
						body.images
					) {
						const images = body.images;

						for (const { file } of images) {
							formData.append(key, file);
						}

						continue;
					}

					if (
						(key as keyof UpdateProductSkuRequest) === "packages" &&
						body.packages
					) {
						for (const pkg of body.packages) {
							const { id, ...rest } = pkg;
							formData.append(key, JSON.stringify(rest));
						}

						continue;
					}

					const value = body[key as keyof UpdateProductSkuRequest];
					if (value !== undefined && value !== null) {
						formData.append(key, value as string);
					}
				}

				return {
					url: `/admin/products-sku/${body.productSkuId}`,
					method: "PATCH",
					body: formData,
				};
			},
			onQueryStarted: async (arg, { dispatch, queryFulfilled, getState }) => {
				const {
					data: { data: productSku },
				} = await queryFulfilled;

				dispatch(
					adminActions.setProductsSkus(
						(getState() as RootState).admin.productsSkus?.filter(
							(p) => p.id !== arg.productSkuId,
						) ?? [],
					),
				);
				dispatch(
					adminApi.util.updateQueryData(
						"getProductsSkus",
						(getState() as RootState).admin.productsSkusFilters,
						(draft) => {
							const index = draft.data.productsSkus.findIndex(
								(u) => u.id === arg.productSkuId,
							);

							if (index === -1) return;
							draft.data.productsSkus[index] = {
								...draft.data.productsSkus[index],
								...productSku,
							};
						},
					),
				);
			},
			invalidatesTags: ["productSku"],
		}),

		deleteProductSku: builder.mutation<
			DeleteProductSkuResponse,
			DeleteProductSkuRequest
		>({
			query: ({ productSkuId }) => ({
				url: `/admin/products-sku/${productSkuId}`,
				method: "DELETE",
			}),
			onQueryStarted: async (arg, { dispatch, queryFulfilled, getState }) => {
				await queryFulfilled;
				dispatch(
					adminApi.util.updateQueryData(
						"getProductsSkus",
						(getState() as RootState).admin.productsSkusFilters,
						(draft) => {
							draft.data.productsSkus = draft.data.productsSkus.filter(
								(p) => p.id !== arg.productSkuId,
							);
						},
					),
				);
			},
		}),

		deleteProductSkuImage: builder.mutation<
			RemoveProductSkuImageResponse,
			RemoveProductSkuImageRequest
		>({
			query: (body) => {
				return {
					url: `/admin/products-sku/${body.productSkuId}/images/${body.imageId}`,
					method: "DELETE",
				};
			},
			onQueryStarted: async (arg, { queryFulfilled, dispatch, getState }) => {
				await queryFulfilled;

				dispatch(
					adminApi.util.updateQueryData(
						"getProductsSkus",
						(getState() as RootState).admin.productsSkusFilters,
						(draft) => {
							const index = draft.data.productsSkus.findIndex(
								(p) => p.id === arg.productSkuId,
							);
							if (index === -1) return;
							draft.data.productsSkus[index] = {
								...draft.data.productsSkus[index],
								images: draft.data.productsSkus[index].images.filter(
									(image) => image.id !== arg.imageId,
								),
							};
						},
					),
				);
			},
		}),

		deleteProductSkuPackage: builder.mutation<
			RemoveProductSkuPackageResponse,
			RemoveProductSkuPackageRequest
		>({
			query: (body) => {
				return {
					url: `/admin/products-sku/${body.productSkuId}/packages/${body.packageId}`,
					method: "DELETE",
				};
			},
			onQueryStarted: async (arg, { queryFulfilled, dispatch, getState }) => {
				await queryFulfilled;

				dispatch(
					adminActions.setProductsSkus(
						(getState() as RootState).admin.productsSkus?.filter(
							(p) => p.id !== arg.productSkuId,
						) ?? [],
					),
				);

				dispatch(
					adminApi.util.updateQueryData(
						"getProductsSkus",
						(getState() as RootState).admin.productsSkusFilters,
						(draft) => {
							const index = draft.data.productsSkus.findIndex(
								(p) => p.id === arg.productSkuId,
							);
							if (index === -1) return;
							draft.data.productsSkus[index] = {
								...draft.data.productsSkus[index],
								packages: draft.data.productsSkus[index].packages.filter(
									(pkg) => pkg.id !== arg.packageId,
								),
							};
						},
					),
				);
			},
			invalidatesTags: ["productSku"],
		}),

		// Promocodes

		getPromocodes: builder.query<GetPromocodesResponse, GetPromocodesRequest>({
			query: (params) => {
				return {
					url: "/admin/promocode",
					params,
				};
			},
		}),

		getPromocode: builder.query<GetPromocodeResponse, GetPromocodeRequest>({
			query: (body) => {
				return { url: `/admin/promocode/${body.promocodeId}` };
			},
		}),

		createPromocode: builder.mutation<
			CreatePromocodeResponse,
			CreatePromocodeRequest
		>({
			query: (body) => {
				return {
					url: "/admin/promocode",
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["promocode"],
		}),

		updatePromocode: builder.mutation<
			UpdatePromocodeResponse,
			UpdatePromocodeRequest
		>({
			query: (body) => {
				return {
					url: `/admin/promocode/${body.promocodeId}`,
					method: "PATCH",
					body,
				};
			},
			invalidatesTags: ["promocode"],
		}),

		deletePromocode: builder.mutation<
			DeletePromocodeResponse,
			DeletePromocodeRequest
		>({
			query: (body) => {
				return {
					url: `/admin/promocode/${body.promocodeId}`,
					method: "DELETE",
				};
			},
			onQueryStarted: async (arg, { queryFulfilled, dispatch, getState }) => {
				await queryFulfilled;

				dispatch(
					adminApi.util.updateQueryData(
						"getPromocodes",
						(getState() as RootState).admin.promocodesFilters,
						(draft) => {
							draft.data.promocodes = draft.data.promocodes.filter(
								(p) => p.id !== arg.promocodeId,
							);
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
	useGetProductsQuery,
	useLazyGetProductQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useDeleteProductAssemblyInstructionMutation,
	useGetProductsSkusQuery,
	useLazyGetProductSkuAdminQuery,
	useCreateProductSkuMutation,
	useUpdateProductSkuMutation,
	useDeleteProductSkuMutation,
	useDeleteProductSkuImageMutation,
	useDeleteProductSkuPackageMutation,
	useGetPromocodesQuery,
	useLazyGetPromocodeQuery,
	useCreatePromocodeMutation,
	useUpdatePromocodeMutation,
	useDeletePromocodeMutation,
} = adminApi;
