import z from "zod";
import { CartItemMaxQuantityPerProduct } from "@/const/schema";

export const addCartItemSchema = z.object({
	productSkuId: z.coerce.number().positive(),
	quantity: z.coerce.number().positive().max(CartItemMaxQuantityPerProduct),
});

export type AddCartItemSchema = z.Infer<typeof addCartItemSchema>;
