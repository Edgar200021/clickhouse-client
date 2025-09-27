import { useEffect } from "react";
import { useLazyGetManufacturerQuery } from "@/store/admin/adminApi";
import { adminSelectors } from "@/store/admin/adminSlice";
import { useAppSelector } from "@/store/store";
import type { Manufacturer } from "@/types/manufacturer";
import { useHandleError } from "./useHandleError";

export const useGetManufacturer = (manufacturerId: Manufacturer["id"]) => {
	const manufacturer = useAppSelector((state) =>
		adminSelectors.getManufacturer(state, Number(manufacturerId)),
	);
	const [getManufacturer, { data, error, isLoading }] =
		useLazyGetManufacturerQuery();

	useHandleError(error);

	useEffect(() => {
		if (!manufacturerId || manufacturer) return;
		getManufacturer({ manufacturerId: Number(manufacturerId) });
	}, [manufacturer, manufacturerId]);

	return { isLoading, error, manufacturer: manufacturer ?? data?.data };
};
