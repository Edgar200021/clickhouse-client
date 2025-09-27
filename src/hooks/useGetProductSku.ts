import { useEffect } from "react";
import { useLazyGetProductSkuQuery } from "@/store/product-sku/productSkuApi";
import { productSkuSelectors } from "@/store/product-sku/productSkuSlice";
import { useAppSelector } from "@/store/store";
import type { ProductSku } from "@/types/product";
import { useHandleError } from "./useHandleError";

export const useGetProductSku = (id: ProductSku["id"]) => {
	const productSku = useAppSelector(productSkuSelectors.getProductSku);

	const [getProduct, { data, error, isLoading, isFetching }] =
		useLazyGetProductSkuQuery();

	useHandleError(error);

	useEffect(() => {
		if (!id || productSku) return;
		getProduct({ productSkuId: Number(id) });
	}, [productSku, id]);

	return {
		productSku: productSku ?? data?.data,
		error,
		isLoading: isLoading || (productSku === null && !data?.data && !error),
		isFetching,
	};
};
