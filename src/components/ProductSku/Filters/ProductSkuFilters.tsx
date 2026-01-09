import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import closeIcon from "@/assets/icons/close.svg";
import sortIcon from "@/assets/icons/sort.svg";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import {
	productSkuActions,
	productSkuSelectors,
} from "@/store/product-sku/productSkuSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "../../ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../../ui/drawer";
import { Check } from "./Check";
import { Price } from "./Price";
import { SalePrice } from "./SalePrice";
import { Sort } from "./Sort";

interface Props {
	className?: string;
}

export const ProductSkuFilters = ({ className }: Props) => {
	const [open, setOpen] = useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen} direction="right">
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					className="p-0 cursor-pointer hover:bg-transparent"
					onClick={() => setOpen(false)}
				>
					<img src={sortIcon} alt="Фильтры" width={24} height={24} />
				</Button>
			</DrawerTrigger>
			<DrawerContent className={cn("!max-w-[500px]", className)}>
				<DrawerHeader>
					<DrawerTitle className="hidden">Фильтры продуктов</DrawerTitle>
					<Button
						variant="ghost"
						className="p-0 w-7 cursor-pointer mb-20 hover:bg-transparent max-w-fit ml-auto mr-8 mt-8"
					>
						<img className="w-full" src={closeIcon} alt="close" />
					</Button>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<div className=" flex flex-col gap-y-3 max-w-[80%] w-full mx-auto h-full pb-24">
					<Sort />
					<Price />
					<SalePrice className="mb-8" />
					<Check />
					<ApplyFilters onClose={() => setOpen(false)} />
				</div>
			</DrawerContent>
		</Drawer>
	);
};

const ApplyFilters = ({ onClose }: { onClose: () => void }) => {
	const filters = useAppSelector(productSkuSelectors.getFilters);
	const lazyFilters = useAppSelector(productSkuSelectors.getLazyFilters);
	const dispatch = useAppDispatch();
	const navigate = useNavigate({
		from: `${Routes.SpecificCatalog}`,
	});

	const disabled =
		Object.keys(lazyFilters).length === 0 ||
		JSON.stringify(filters) === JSON.stringify(lazyFilters);

	return (
		<div className="mt-auto flex flex-col gap-y-3 items-center w-full">
			<Button
				disabled={disabled}
				onClick={() => {
					if (disabled) return;

					const withoutFalsy = Object.fromEntries(
						Object.entries(lazyFilters).filter(
							([_, val]) => typeof val !== "boolean" || val,
						),
					);

					dispatch(
						productSkuActions.setFilters({
							type: "multiple",
							values: withoutFalsy,
							clearPrev: true,
						}),
					);
					navigate({ to: ".", search: withoutFalsy });
					onClose();
				}}
				className="bg-orange-400 text-white py-6 rounded-4xl cursor-pointer w-full text-lg hover:bg-orange-400"
			>
				Применить
			</Button>
			<Button
				disabled={Object.keys(filters).length === 0}
				variant="ghost"
				className="cursor-pointer p-0 underline hover:bg-transparent text-lg"
				onClick={() => {
					dispatch(productSkuActions.clearFilters());
					dispatch(productSkuActions.clearLazyFilters());
					navigate({ to: ".", search: undefined });
				}}
			>
				Сбросить фильтры
			</Button>
		</div>
	);
};