import z from "zod";
import { createProductSchema } from "./createProduct.schema";

export const updateProductSchema = createProductSchema.partial().extend({
	productId: z.number().positive(),
});

export type UpdateProductSchema = z.Infer<typeof updateProductSchema>;
