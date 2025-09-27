import { getProductsSkusSchema } from "../api/productSku/getProductsSkus.schema";

export const catalogSearchParamsSchema = getProductsSkusSchema
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
