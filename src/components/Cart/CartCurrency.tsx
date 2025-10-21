import { Currencies } from "@/const/currencies";
import { cartActions, cartSelectors } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Currency } from "@/types/currency.enum";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

type Props = {
	className?: string;
};

export const CartCurrency = ({ className }: Props) => {
	const currency = useAppSelector(cartSelectors.getFiltersCurrencyTo);
	const dispatch = useAppDispatch();

	return (
		<div className={className}>
			<Select
				value={currency || Currency.Rub}
				onValueChange={(val) =>
					dispatch(
						cartActions.setFilters({
							type: "single",
							key: "currencyTo",
							val: val as Currency,
						}),
					)
				}
			>
				<SelectTrigger className="w-[120px]">
					<SelectValue placeholder="Currency" />
				</SelectTrigger>
				<SelectContent>
					{Object.values(Currency).map((cur) => (
						<SelectItem key={cur} value={cur}>
							{cur}&nbsp;{Currencies[cur]}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
