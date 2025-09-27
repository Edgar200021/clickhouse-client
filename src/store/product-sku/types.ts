import type { GetProductsSkusSchema } from "@/schemas/api/productSku/getProductsSkus.schema";
import type { ApiSuccessResponse, WithPageCountResponse } from "@/types/api";
import type { ProductSku } from "@/types/product";
import type { CombinedProductSku } from "./productSkuSlice";

export type GetProductsSkusRequest = GetProductsSkusSchema;
export type GetProductsSkusResponse = ApiSuccessResponse<
	WithPageCountResponse<CombinedProductSku[], "productsSkus">
>;

export type GetProductSkuRequest = {
	productSkuId: ProductSku["id"];
};
export type GetProductSkuResponse = ApiSuccessResponse<CombinedProductSku>;
