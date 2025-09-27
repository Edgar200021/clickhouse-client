import { useEffect } from "react";
import { useLazyGetPromocodeQuery } from "@/store/admin/adminApi";
import { adminSelectors } from "@/store/admin/adminSlice";
import { useAppSelector } from "@/store/store";
import type { PromocodeAdmin } from "@/types/promocode";
import { useHandleError } from "./useHandleError";

export const useGetPromocode = (id: PromocodeAdmin["id"]) => {
	const promocode = useAppSelector(adminSelectors.getPromocode);
	const [getPromocode, { data, error, isLoading, isFetching }] =
		useLazyGetPromocodeQuery();

	useHandleError(error);

	useEffect(() => {
		if (!id || promocode) return;
		getPromocode({ promocodeId: Number(id) });
	}, [promocode, id]);

	return { promocode: promocode ?? data?.data, error, isLoading, isFetching };
};
