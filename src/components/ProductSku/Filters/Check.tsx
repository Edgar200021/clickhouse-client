import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
	productSkuActions,
	productSkuSelectors,
} from "@/store/product-sku/productSkuSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

interface Props {
	className?: string;
}

export const Check = ({ className }: Props) => {
	const withDiscount = useAppSelector(
		productSkuSelectors.getFiltersWithDiscount,
	);
	const withDiscountLazy = useAppSelector(
		productSkuSelectors.getLazyFiltersWithDiscount,
	);

	const inStock = useAppSelector(productSkuSelectors.getFiltersSortInStock);
	const inStockLazy = useAppSelector(
		productSkuSelectors.getLazyFiltersSortInStock,
	);

	const dispatch = useAppDispatch();

	const finalInStock = inStockLazy ?? inStock ?? false;

	const finalWithoutDiscount = withDiscountLazy ?? withDiscount ?? false;

	return (
		<div className={cn("flex flex-col gap-y-3", className)}>
			<Label className="flex w-full items-center justify-between gap-x-2 text-lg cursor-pointer">
				Только со скидкой
				<Checkbox
					className="cursor-pointer  data-[state=checked]:bg-orange-400 data-[state=checked]:border-0"
					checked={finalWithoutDiscount}
					onCheckedChange={(v) =>
						dispatch(
							productSkuActions.setLazyFilters({
								type: "single",
								key: "withDiscount",
								val: Boolean(v),
							}),
						)
					}
				/>
			</Label>
			<Label className="flex w-full items-center justify-between gap-x-2 text-lg cursor-pointer ">
				В наличии
				<Checkbox
					className="cursor-pointer  data-[state=checked]:bg-orange-400 data-[state=checked]:border-0"
					checked={finalInStock}
					onCheckedChange={(v) =>
						dispatch(
							productSkuActions.setLazyFilters({
								type: "single",
								key: "inStock",
								val: Boolean(v),
							}),
						)
					}
				/>
			</Label>
		</div>
	);
};
