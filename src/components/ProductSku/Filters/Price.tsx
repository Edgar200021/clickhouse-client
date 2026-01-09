import arrowIcon from "@/assets/icons/arrow.svg";
import { PriceControl } from "@/components/PriceControl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

interface Props {
	className?: string;
}

export const Price = ({ className }: Props) => {
	const minValue = useAppSelector(productSkuSelectors.getFiltersMinPrice);
	const minLazyValue = useAppSelector(
		productSkuSelectors.getLazyFiltersMinPrice,
	);

	const maxValue = useAppSelector(productSkuSelectors.getFiltersMaxPrice);
	const maxLazyValue = useAppSelector(
		productSkuSelectors.getLazyFiltersMaxPrice,
	);

	const dispatch = useAppDispatch();

	return (
		<Collapsible>
			<CollapsibleTrigger asChild>
				<Button
					variant="ghost"
					className={cn(
						"cursor-pointer group rounded-[8px] px-2 py-3 flex gap-x-2 w-full justify-start text-lg hover:bg-transparent p-0",
						className,
					)}
				>
					<span>Цена</span>
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
				className={
					"overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down pl-5 pt-3 pb-2"
				}
			>
				<PriceControl
					defaultValues={
						minValue !== undefined && maxValue !== undefined
							? [minValue, maxValue]
							: minLazyValue !== undefined && maxLazyValue !== undefined
								? [minLazyValue, maxLazyValue]
								: undefined
					}
					max={500_000}
					onChange={(arg) => {
						dispatch(
							productSkuActions.setLazyFilters({
								type: "multiple",
								values: {
									minPrice: arg[0],
									maxPrice: arg[1],
								},
							}),
						);
					}}
					type="minimal"
					className="max-w-full"
				/>
			</CollapsibleContent>
		</Collapsible>
	);
};
