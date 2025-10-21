import { CartItemMaxQuantityPerProduct } from "@/const/schema";
import { applyPromocode } from "@/lib/utils";
import { Currency } from "@/types/currency.enum";
import { PromocodeType } from "@/types/promocode";
import { baseApi } from "../baseApi";
import type { RootState } from "../store";
import type {
	AddCartItemReponse,
	AddCartItemRequest,
	AddCartPromocodeReponse,
	AddCartPromocodeRequest,
	ClearCartRequest,
	ClearCartResponse,
	DeleteCartItemRequest,
	DeleteCartItemResponse,
	DeleteCartPromocodeReponse,
	DeleteCartPromocodeRequest,
	GetCartRequest,
	GetCartResponse,
	UpdateCartItemRequest,
	UpdateCartItemResponse,
} from "./types";

export const cartApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getCart: builder.query<GetCartResponse, GetCartRequest>({
			query: (params) => {
				return { url: "/cart", params };
			},
			providesTags: ["cart"],
		}),

		addCartPromocode: builder.mutation<
			AddCartPromocodeReponse,
			AddCartPromocodeRequest
		>({
			query: (body) => {
				return {
					url: "/cart/promocode",
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["cart"],
		}),

		deleteCartPromocode: builder.mutation<
			DeleteCartPromocodeReponse,
			DeleteCartPromocodeRequest
		>({
			query: () => {
				return {
					url: "/cart/promocode",
					method: "DELETE",
				};
			},
			invalidatesTags: ["cart"],
		}),

		addCartItem: builder.mutation<AddCartItemReponse, AddCartItemRequest>({
			query: (body) => {
				return {
					url: "/cart/items",
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["cart"],
		}),

		updateCartItem: builder.mutation<
			UpdateCartItemResponse,
			UpdateCartItemRequest
		>({
			query: (body) => {
				return {
					url: `/cart/items/${body.cartItemId}`,
					method: "PATCH",
					body,
				};
			},
			onQueryStarted: async (arg, { queryFulfilled, dispatch, getState }) => {
				await queryFulfilled;

				const cartFilters = (getState() as RootState).cart.filters;

				dispatch(
					cartApi.util.updateQueryData("getCart", cartFilters, (draft) => {
						const index = draft.data.cartItems.findIndex(
							(i) => i.id === arg.cartItemId,
						);

						if (index === -1) {
							cartApi.util.invalidateTags(["cart"]);
							return;
						}

						const cartItem = draft.data.cartItems[index];
						const oldSafeQuantity = Math.min(
							cartItem.quantity,
							cartItem.productSkuQuantity,
							CartItemMaxQuantityPerProduct,
						);
						const newSafeQuantity = Math.min(
							arg.quantity,
							cartItem.productSkuQuantity,
							CartItemMaxQuantityPerProduct,
						);
						const price = cartItem.salePrice ?? cartItem.price;

						const delta = price * (newSafeQuantity - oldSafeQuantity);

						draft.data.cartItems[index] = {
							...cartItem,
							quantity: newSafeQuantity,
						};

						draft.data.totalPrice += Number(delta.toFixed(2));
						draft.data.totalPrice = Number(draft.data.totalPrice.toFixed(2));
					}),
				);
			},
		}),

		deleteCartItem: builder.mutation<
			DeleteCartItemResponse,
			DeleteCartItemRequest
		>({
			query: (body) => {
				return {
					url: `/cart/items/${body.cartItemId}`,
					method: "DELETE",
				};
			},
			onQueryStarted: async (arg, { queryFulfilled, dispatch, getState }) => {
				await queryFulfilled;

				const cartFilters = (getState() as RootState).cart.filters;

				dispatch(
					cartApi.util.updateQueryData("getCart", cartFilters, (draft) => {
						const index = draft.data.cartItems.findIndex(
							(i) => i.id === arg.cartItemId,
						);

						if (index === -1) {
							cartApi.util.invalidateTags(["cart"]);
							return;
						}

						const cartItem = draft.data.cartItems[index];

						draft.data.cartItems = draft.data.cartItems.filter(
							(c) => c.id !== arg.cartItemId,
						);

						const price = cartItem.salePrice ?? cartItem.price;

						draft.data.totalPrice -=
							price *
							Math.min(
								cartItem.quantity,
								cartItem.productSkuQuantity,
								CartItemMaxQuantityPerProduct,
							);

						draft.data.totalPrice = Number(draft.data.totalPrice.toFixed(2));
					}),
				);
			},
		}),

		clearCart: builder.mutation<ClearCartResponse, ClearCartRequest>({
			query: () => {
				return {
					url: `/cart/items/clear`,
					method: "POST",
				};
			},
			onQueryStarted: async (_, { queryFulfilled, dispatch, getState }) => {
				await queryFulfilled;

				const cartFilters = (getState() as RootState).cart.filters;

				dispatch(
					cartApi.util.updateQueryData("getCart", cartFilters, (draft) => {
						draft.data.cartItems = [];
						draft.data.totalPrice = 0;
					}),
				);
			},
		}),
	}),
});

export const {
	useGetCartQuery,
	useAddCartPromocodeMutation,
	useDeleteCartPromocodeMutation,
	useAddCartItemMutation,
	useUpdateCartItemMutation,
	useDeleteCartItemMutation,
	useClearCartMutation,
} = cartApi;
