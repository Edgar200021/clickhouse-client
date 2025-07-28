import { useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import type { Routes } from "@/const/routes";
import {
	type GetProductsFiltersSchema,
	getProductsFiltersSchema,
} from "@/schemas/api/products/getProducts.schema";
import { productActions } from "@/store/product/productSlice";
import { useAppDispatch } from "@/store/store";

type Props = {
	from: (typeof Routes)["Catalog"];
};

export const SynchronizeSearchParamsWithState = ({ from }: Props) => {
	const params = useSearch({
		from,
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!params) return;

		if (from === "/catalog") {
			const validKeys = Object.keys(getProductsFiltersSchema.shape);
			const filtersFromSearch = Object.entries(params).reduce(
				(acc: GetProductsFiltersSchema, [key, value]) => {
					if (validKeys.includes(key)) {
						acc[key as keyof GetProductsFiltersSchema] = value;
					}
					return acc;
				},
				{} as GetProductsFiltersSchema,
			);

			dispatch(productActions.setFilters(filtersFromSearch));
		}
	}, []);

	return null;
};
