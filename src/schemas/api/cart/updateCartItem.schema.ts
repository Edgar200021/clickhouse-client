import z from "zod";
import { CartItemMaxQuantityPerProduct } from "@/const/schema";

export const updateCartItemSchema = z.object({
	cartItemId: z.coerce.number().positive(),
	quantity: z.coerce.number().positive().max(CartItemMaxQuantityPerProduct),
});

export type UpdateCartItemSchema = z.Infer<typeof updateCartItemSchema>;
