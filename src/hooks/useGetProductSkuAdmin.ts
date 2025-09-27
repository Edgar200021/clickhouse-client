import { useEffect } from "react";
import { useLazyGetProductSkuAdminQuery } from "@/store/admin/adminApi";
import { adminSelectors } from "@/store/admin/adminSlice";
import { useAppSelector } from "@/store/store";
import type { ProductSku } from "@/types/product";
import { useHandleError } from "./useHandleError";

export const useGetProductSkuAdmin = (id: ProductSku["id"]) => {
	const productSku = useAppSelector((state) =>
		adminSelectors.getProductSku(state, id),
	);

	const [getProduct, { data, error, isLoading, isFetching }] =
		useLazyGetProductSkuAdminQuery();

	useHandleError(error);

	useEffect(() => {
		if (!id || productSku) return;
		getProduct({ productSkuId: Number(id) });
	}, [productSku, id]);

	return {
		productSkuAdmin: productSku ?? data?.data,
		error,
		isLoading: isLoading || (productSku === undefined && !data?.data && !error),
		isFetching,
	};
};
