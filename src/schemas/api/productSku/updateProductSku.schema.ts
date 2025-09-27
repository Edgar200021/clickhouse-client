import z from "zod";
import { createProductSkuSchema } from "./createProductSku.schema";

export const updateProductSkuSchema = createProductSkuSchema
	.partial()
	.omit({
		productId: true,
	})
	.extend({
		productSkuId: z.number().positive(),
	})
	.refine((obj) => (obj.salePrice ? obj.salePrice < obj.price! : true), {
		error: "Sale price must be less than the regular price",
	});

export type UpdateProductSkuSchema = z.Infer<typeof updateProductSkuSchema>;
