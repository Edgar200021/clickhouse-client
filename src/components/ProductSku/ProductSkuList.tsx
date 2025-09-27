import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { getProductsSkusSchema } from "@/schemas/api/productSku/getProductsSkus.schema";
import { useLazyGetProductsSkusQuery } from "@/store/product-sku/productSkuApi";
import {
	productSkuActions,
	productSkuSelectors,
} from "@/store/product-sku/productSkuSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Pagination } from "../Pagination";
import { Spinner } from "../ui/Spinner";
import { ProductSku } from "./ProductSku";

type FilterKeys = keyof ReturnType<typeof productSkuSelectors.getFilters>;

type Props = {
	className?: string;
	showWhenKeysProvided?: FilterKeys[];
	withPagination?: boolean;
	renderElement?: {
		fn: (productSkuLength: number) => ReactNode;
		position: "top" | "bottom";
	};
	type?: "base" | "cart";
	baseFilters?: ReturnType<typeof productSkuSelectors.getFilters>;
};

export const ProductSkuList = ({
	className,
	showWhenKeysProvided,
	renderElement,
	withPagination = true,
	type = "base",
	baseFilters,
}: Props) => {
	const filters = useAppSelector(productSkuSelectors.getFilters);
	const [getProductsSkus, { data, isLoading, error }] =
		useLazyGetProductsSkusQuery();
	useHandleError(error);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (
			showWhenKeysProvided &&
			(!Object.keys({ ...baseFilters, ...filters }).some((key) =>
				showWhenKeysProvided.includes(key as FilterKeys),
			) ||
				Object.values({ ...baseFilters, ...filters }).every(
					(val) => val === undefined,
				))
		)
			return;
		(async () => {
			const { data, error } = await getProductsSkusSchema.safeParseAsync({
				...baseFilters,
				...filters,
			});

			if (error) {
				return toast.error("Не валидные фильтры");
			}

			getProductsSkus(data);
		})();
	}, [filters, showWhenKeysProvided, baseFilters]);

	useEffect(() => {
		return () => {
			dispatch(productSkuActions.clearFilters());
		};
	}, []);

	if (isLoading)
		return (
			<div className="flex items-center justify-center mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (error || !data) return;

	if (filters.search && data.data.productsSkus.length === 0)
		return (
			<h1 className="text-3xl font-bold">
				Товар по запросу "{filters.search}" не найден
			</h1>
		);

	const renderList = () => {
		return (
			<>
				{renderElement &&
					renderElement.position === "top" &&
					renderElement.fn(data.data.productsSkus.length)}
				<ul
					className={cn(
						`grid gap-10 mb-20
				grid-cols-[repeat(auto-fill,minmax(250px,1fr))]
				max-md:justify-items-center`,
						className,
					)}
				>
					{data.data.productsSkus.map((p) => (
						<li className="w-fit" key={p.id}>
							<ProductSku type={type} productSku={p} />
						</li>
					))}
				</ul>
				{withPagination && (
					<Pagination
						totalPages={data.data.pageCount}
						currentPage={filters.page || 1}
						onPageChange={(page) => {
							dispatch(
								productSkuActions.setFilters({
									type: "single",
									key: "page",
									val: page,
								}),
							);
							navigate({
								to: ".",
								search: (prev) => ({ ...prev, page }),
							});
						}}
						className="!mx-auto max-w-fit"
					/>
				)}

				{renderElement &&
					renderElement.position === "bottom" &&
					renderElement.fn(data.data.productsSkus.length)}
			</>
		);
	};

	if (showWhenKeysProvided) {
		const shouldShow =
			Object.keys({ ...baseFilters, ...filters }).some((key) =>
				showWhenKeysProvided.includes(key as FilterKeys),
			) &&
			Object.values({ ...baseFilters, ...filters }).some(
				(val) => val !== undefined,
			);
		return shouldShow ? renderList() : null;
	}

	return renderList();
};
