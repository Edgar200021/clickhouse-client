import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import sortIcon from "@/assets/icons/sort.svg";
import { PriceControl } from "@/components/PriceControl";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { adminActions, adminSelectors } from "@/store/admin/adminSlice";
import type { GetProductsSkusAdminRequest } from "@/store/admin/types";
import { useAppDispatch, useAppSelector } from "@/store/store";

type CommonProps = {
	handleChange: <
		T extends keyof Pick<
			GetProductsSkusAdminRequest,
			| "isDeleted"
			| "limit"
			| "maxPrice"
			| "minPrice"
			| "maxSalePrice"
			| "minSalePrice"
			| "sku"
		>,
	>(
		key: T,
		val: GetProductsSkusAdminRequest[T] | undefined,
	) => void;
};

type RangeFilterProps<
	T extends keyof Pick<
		GetProductsSkusAdminRequest,
		"minPrice" | "maxPrice" | "minSalePrice" | "maxSalePrice"
	>,
> = {
	label: string;
	minKey: T;
	maxKey: T;
	handleChange: (
		key: T,
		val: GetProductsSkusAdminRequest[T] | undefined,
	) => void;
	minValue?: number;
	maxValue?: number;
};

const IsDeleted = ({ handleChange }: CommonProps) => {
	const isDeleted = useAppSelector(
		adminSelectors.getProductsSkusFiltersIsDeleted,
	);
	return (
		<div>
			<span className="block text-sm font-medium mb-2">Архивирован</span>
			<Select
				value={isDeleted === undefined ? "all" : isDeleted ? "true" : "false"}
				onValueChange={(val) =>
					handleChange("isDeleted", val === "all" ? undefined : val === "true")
				}
			>
				<SelectTrigger className="cursor-pointer">
					<SelectValue placeholder="Все" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Все</SelectItem>
					<SelectItem value="true">Да</SelectItem>
					<SelectItem value="false">Нет</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

const Limit = ({ handleChange }: CommonProps) => {
	const limit = useAppSelector(adminSelectors.getProductsSkusFiltersLimit);
	const options = [10, 25, 50, 100];

	return (
		<div>
			<span className="block text-sm font-medium mb-2">
				Показывать на странице
			</span>
			<Select
				value={limit?.toString() ?? ""}
				onValueChange={(val) =>
					handleChange("limit", val ? Number(val) : undefined)
				}
			>
				<SelectTrigger className="cursor-pointer">
					<SelectValue placeholder="По умолчанию" />
				</SelectTrigger>
				<SelectContent>
					{options.map((n) => (
						<SelectItem key={n} value={n.toString()}>
							{n}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

const RangeFilter = <
	T extends keyof Pick<
		GetProductsSkusAdminRequest,
		"minPrice" | "maxPrice" | "minSalePrice" | "maxSalePrice"
	>,
>({
	label,
	minKey,
	maxKey,
	handleChange,
	minValue,
	maxValue,
}: RangeFilterProps<T>) => {
	const [val, setVal] = useState([minValue, maxValue]);
	const debounced = useDebounceValue(val, 500);

	useEffect(() => {
		const min = debounced[0][0];
		const max = debounced[0][1];

		if (min && min !== minValue) {
			handleChange(minKey, min);
		}

		if (max && max !== maxValue) {
			handleChange(maxKey, max);
		}
	}, [debounced]);

	return (
		<div>
			<span className="block text-sm font-medium mb-2">{label}</span>
			<PriceControl
				defaultValues={
					minValue !== undefined && maxValue !== undefined
						? [minValue, maxValue]
						: undefined
				}
				onChange={(arg) => {
					setVal(arg);
				}}
			/>
		</div>
	);
};

const Price = ({ handleChange }: CommonProps) => {
	const minPrice = useAppSelector(
		adminSelectors.getProductsSkusFiltersMinPrice,
	);
	const maxPrice = useAppSelector(
		adminSelectors.getProductsSkusFiltersMaxPrice,
	);

	return (
		<RangeFilter
			label="Цена"
			minKey="minPrice"
			maxKey="maxPrice"
			handleChange={handleChange}
			minValue={minPrice}
			maxValue={maxPrice}
		/>
	);
};

const SalePrice = ({ handleChange }: CommonProps) => {
	const minSalePrice = useAppSelector(
		adminSelectors.getProductsSkusFiltersMinSalePrice,
	);
	const maxSalePrice = useAppSelector(
		adminSelectors.getProductsSkusFiltersMaxSalePrice,
	);

	return (
		<RangeFilter
			label="Скидочная цена"
			minKey="minSalePrice"
			maxKey="maxSalePrice"
			handleChange={handleChange}
			minValue={minSalePrice}
			maxValue={maxSalePrice}
		/>
	);
};

export const AdminProductSkuFilters = () => {
	const dispatch = useAppDispatch();
	const sku = useAppSelector(adminSelectors.getProductsSkusFiltersSku);

	const handleChange = <
		T extends keyof Pick<
			GetProductsSkusAdminRequest,
			| "isDeleted"
			| "limit"
			| "maxPrice"
			| "minPrice"
			| "maxSalePrice"
			| "minSalePrice"
			| "sku"
		>,
	>(
		key: T,
		val: GetProductsSkusAdminRequest[T] | undefined,
	) => {
		dispatch(adminActions.setProductsSkusFilters({ key, val }));
	};

	return (
		<Drawer direction="right">
			<DrawerTrigger asChild>
				<Button variant="ghost" className="p-0 cursor-pointer">
					<img src={sortIcon} alt="Фильтры" width={24} height={24} />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Фильтры продуктов</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<div className="p-4 flex flex-col gap-4">
					<IsDeleted handleChange={handleChange} />
					<Limit handleChange={handleChange} />
					<Price handleChange={handleChange} />
					<SalePrice handleChange={handleChange} />
				</div>
			</DrawerContent>
		</Drawer>
	);
};
