import { useEffect } from "react";
import { useLazyGetProductQuery } from "@/store/admin/adminApi";
import { adminSelectors } from "@/store/admin/adminSlice";
import { useAppSelector } from "@/store/store";
import type { ProductAdmin } from "@/types/product";
import { useHandleError } from "./useHandleError";

export const useGetProduct = (id: ProductAdmin["id"]) => {
	const product = useAppSelector((state) =>
		adminSelectors.getProduct(state, id),
	);
	const [getProduct, { data, error, isLoading }] = useLazyGetProductQuery();

	useHandleError(error);

	useEffect(() => {
		if (!id || product) return;
		getProduct({ productId: Number(id) });
	}, [product, id]);

	return { productAdmin: product ?? data?.data, error, isLoading };
};
