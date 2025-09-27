import z from "zod";
import { GetProductsSkusMaxLimit } from "@/const/schema";

export const getProductsSkusAdminSchema = z
	.object({
		search: z.string().trim().optional(),
		limit: z.coerce.number().positive().max(GetProductsSkusMaxLimit).optional(),
		page: z.coerce.number().positive().optional(),
		isDeleted: z.coerce.boolean().optional(),
		inStock: z.coerce.boolean().optional(),
		withDistount: z.coerce.boolean().optional(),
		sku: z.string().optional(),
		minPrice: z.number().gte(0).optional(),
		maxPrice: z.number().positive().optional(),
		minSalePrice: z.number().gte(0).optional(),
		maxSalePrice: z.number().positive().optional(),
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

export type GetProductsSkusAdminSchema = z.Infer<
	typeof getProductsSkusAdminSchema
>;
