import { useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import type { Routes } from "@/const/routes";
import {
	type GetProductsSkusSchema,
	getProductsSkusSchema,
} from "@/schemas/api/productSku/getProductsSkus.schema";
import { productSkuActions } from "@/store/product-sku/productSkuSlice";
import { useAppDispatch } from "@/store/store";

type Props = {
	from:
		| `/_regularLayout${(typeof Routes)["SpecificCatalog"]}`
		| `/_regularLayout${(typeof Routes)["Catalog"]}/`;
};

export const SynchronizeSearchParamsWithState = ({ from }: Props) => {
	const params = useSearch({
		from,
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!params) return;

		if (
			from === "/_regularLayout/catalog/$catalogPath" ||
			from === "/_regularLayout/catalog/"
		) {
			const validKeys = Object.keys(getProductsSkusSchema.shape);

			const filtersFromSearch = Object.entries(params).reduce(
				(acc: GetProductsSkusSchema, [key, value]) => {
					if (validKeys.includes(key)) {
						acc[key as keyof GetProductsSkusSchema] = value;
					}
					return acc;
				},
				{} as GetProductsSkusSchema,
			);

			dispatch(
				productSkuActions.setFilters({
					type: "multiple",
					values: filtersFromSearch,
				}),
			);
		}
	}, [from]);

	return null;
};
