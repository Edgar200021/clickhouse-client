import type { AddCartItemSchema } from "@/schemas/api/cart/addCartItem.schema";
import type { AddCartPromocodeSchema } from "@/schemas/api/cart/addCartPromocode.schema";
import type { DeleteCartItemSchema } from "@/schemas/api/cart/deleteCartItem.schema";
import type { UpdateCartItemSchema } from "@/schemas/api/cart/updateCartItem.schema";
import type { ApiSuccessResponse } from "@/types/api";
import type { Nullable } from "@/types/base";
import type { CartItemCombined } from "@/types/cart";
import type { Promocode } from "@/types/promocode";

export type GetCartRequest = null;
export type GetCartResponse = ApiSuccessResponse<{
	totalPrice: number;
	promocode: Nullable<Promocode>;
	cartItems: CartItemCombined[];
}>;

export type AddCartPromocodeRequest = AddCartPromocodeSchema;
export type AddCartPromocodeReponse = ApiSuccessResponse<Promocode>;

export type AddCartItemRequest = AddCartItemSchema;
export type AddCartItemReponse = ApiSuccessResponse<null>;

export type UpdateCartItemRequest = UpdateCartItemSchema;
export type UpdateCartItemResponse = ApiSuccessResponse<null>;

export type DeleteCartItemRequest = DeleteCartItemSchema;
export type DeleteCartItemResponse = ApiSuccessResponse<null>;

export type ClearCartRequest = null;
export type ClearCartResponse = ApiSuccessResponse<null>;
