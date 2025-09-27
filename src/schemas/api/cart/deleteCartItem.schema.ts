import type z from "zod";
import { updateCartItemSchema } from "./updateCartItem.schema";

export const deleteCartItemSchema = updateCartItemSchema.pick({
	cartItemId: true,
});

export type DeleteCartItemSchema = z.Infer<typeof deleteCartItemSchema>;
