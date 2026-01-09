import { useEffect, useRef, useState } from "react";
import arrowIcon from "@/assets/icons/arrow.svg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { GetProductsSkusSchema } from "@/schemas/api/productSku/getProductsSkus.schema";
import {
	productSkuActions,
	productSkuSelectors,
} from "@/store/product-sku/productSkuSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../../ui/collapsible";

const sortOptions = {
	popularity: "По популярности",
	priceASC: "Цена: от низкой к высокой",
	priceDESC: "Цена: от высокой к низкой",
	alphabetASC: "По алфавиту: от А до Я",
	alphabetDESC: "По алфавиту: от Я до А",
} satisfies Record<Exclude<GetProductsSkusSchema["sort"], undefined>, string>;

export const Sort = () => {
	const sort = useAppSelector(productSkuSelectors.getFiltersSort);
	const lazySort = useAppSelector(productSkuSelectors.getLazyFiltersSort);

	const dispatch = useAppDispatch();


	useEffect(() => {
	  if (!sort) return
			dispatch(productSkuActions.setLazyFilters({
				type: "single",
				key: "sort",
				val: sort
			}))
	}, [])


	const finalSort = lazySort ?? ""

	return (
		<Collapsible>
			<CollapsibleTrigger asChild>
				<Button
					variant="ghost"
					className={
						"cursor-pointer group  rounded-[8px] px-2 py-3 flex gap-x-2 w-full justify-start text-lg hover:bg-transparent p-0"
					}
				>
					<span>Сортировать</span>
					<img
						className="transition-transform duration-300 ease group-data-[state=open]:-rotate-180 ml-auto"
						width={14}
						height={8}
						src={arrowIcon}
						alt="arrow"
					/>
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent
				className={cn(
					"overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down pl-5 pt-3",
				)}
			>
				<div className="space-y-2">
					{Object.entries(sortOptions).map(([id, label]) => (
						<Label
							key={id}
							className="flex items-center justify-between w-full cursor-pointer"
						>
							{label}
							<Checkbox
								value={id}
								className="data-[state=checked]:bg-orange-400 data-[state=checked]:border-none cursor-pointer data-[state=checked]:text-white rounded-[4px] pointer-events-none"
								checked={id === finalSort}
								onCheckedChange={(e) => {
									dispatch(
										productSkuActions.setLazyFilters({
											type: "single",
											key: "sort",
											val: e.valueOf() ? id : undefined,
										}),
									);
								}}
							/>
						</Label>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};
