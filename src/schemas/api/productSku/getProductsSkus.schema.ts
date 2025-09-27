import z from "zod";
import { getProductsSkusAdminSchema } from "./getProductsSkusAdmin.schema";

export const getProductsSkusSchema = getProductsSkusAdminSchema
	.omit({
		isDeleted: true,
	})
	.extend({
		categoryId: z.number().positive().optional(),
	})
	.refine((schema) => {
		if (schema.minPrice && schema.maxPrice)
			return schema.minPrice <= schema.maxPrice;

		return true;
	})
	.refine((schema) => {
		if (schema.minSalePrice && schema.maxSalePrice)
			return schema.minSalePrice <= schema.maxSalePrice;

		return true;
	});

export type GetProductsSkusSchema = z.Infer<typeof getProductsSkusSchema>;
