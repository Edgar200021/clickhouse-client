import { CartItemMaxQuantityPerProduct } from "@/const/schema";
import { applyPromocode } from "@/lib/utils";
import { baseApi } from "../baseApi";
import type {
	AddCartItemReponse,
	AddCartItemRequest,
	AddCartPromocodeReponse,
	AddCartPromocodeRequest,
	ClearCartRequest,
	ClearCartResponse,
	DeleteCartItemRequest,
	DeleteCartItemResponse,
	GetCartRequest,
	GetCartResponse,
	UpdateCartItemRequest,
	UpdateCartItemResponse,
} from "./types";

export const cartApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getCart: builder.query<GetCartResponse, GetCartRequest>({
			query: () => {
				return { url: "/cart" };
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
			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				const { data } = await queryFulfilled;

				dispatch(
					cartApi.util.updateQueryData("getCart", null, (draft) => {
						draft.data.promocode = data.data;
						draft.data.totalPrice = applyPromocode(
							draft.data.totalPrice,
							data.data,
						);
					}),
				);
			},
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
			onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
				await queryFulfilled;

				dispatch(
					cartApi.util.updateQueryData("getCart", null, (draft) => {
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

						draft.data.totalPrice += delta;
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
			onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
				await queryFulfilled;

				dispatch(
					cartApi.util.updateQueryData("getCart", null, (draft) => {
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
			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				await queryFulfilled;

				dispatch(
					cartApi.util.updateQueryData("getCart", null, (draft) => {
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
	useAddCartItemMutation,
	useUpdateCartItemMutation,
	useDeleteCartItemMutation,
	useClearCartMutation,
} = cartApi;
