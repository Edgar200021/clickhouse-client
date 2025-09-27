import { baseApi } from "../baseApi";
import type {
	GetProductSkuRequest,
	GetProductSkuResponse,
	GetProductsSkusRequest,
	GetProductsSkusResponse,
} from "./types";

export const productSkuApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getProductsSkus: builder.query<
			GetProductsSkusResponse,
			GetProductsSkusRequest
		>({
			query: (params) => {
				return { url: "/product-sku", params };
			},
		}),

		getProductSku: builder.query<GetProductSkuResponse, GetProductSkuRequest>({
			query: (body) => {
				return { url: `/product-sku/${body.productSkuId}` };
			},
		}),
	}),
});

export const {
	useGetProductsSkusQuery,
	useLazyGetProductsSkusQuery,
	useLazyGetProductSkuQuery,
} = productSkuApi;
