import type { GetProductsFiltersSchema } from "@/schemas/api/products/getProducts.schema";
import type { ApiSuccessResponse } from "@/types/api";

export type GetProductsRequest = GetProductsFiltersSchema;
export type GetProductsResponse = ApiSuccessResponse<string>;
