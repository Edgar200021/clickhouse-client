import { useCallback } from "react";
import { StatusLabels } from "@/const/order";
import { GetOrdersMaxLimit } from "@/const/schema";
import { cn } from "@/lib/utils";
import { orderActions, orderSelectors } from "@/store/order/orderSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { OrderStatus } from "@/types/order";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface Props {
	className?: string;
}

const LIMIT_OPTIONS = [10, 20, 25, 30, 50, 100].filter(
	(n) => n <= GetOrdersMaxLimit,
);

const Limit = () => {
	const filtersLimit = useAppSelector(orderSelectors.getFiltersLimit);
	const dispatch = useAppDispatch();

	const handleChange = useCallback(
		(value: string) => {
			const num = Number(value);
			if (num === filtersLimit) return;
			dispatch(
				orderActions.setFilters({
					type: "single",
					key: "limit",
					val: num,
				}),
			);
		},
		[dispatch, filtersLimit],
	);

	return (
		<div>
			<label className="block text-xs font-medium text-muted-foreground mb-1">
				Показывать
			</label>
			<Select
				value={String(filtersLimit ?? LIMIT_OPTIONS[0])}
				onValueChange={handleChange}
			>
				<SelectTrigger className="w-full focus-visible:ring-0 cursor-pointer">
					<SelectValue />
				</SelectTrigger>
				<SelectContent >
					{LIMIT_OPTIONS.map((opt) => (
						<SelectItem
							className="cursor-pointer"
							key={opt}
							value={String(opt)}
						>
							{opt} на странице
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

const Status = () => {
	const filtersStatus = useAppSelector(orderSelectors.getFiltersStatus);
	const dispatch = useAppDispatch();

	const handleChange = useCallback(
		(value: string) => {
			const valToSend = value === "all" ? undefined : value;
			if (valToSend === filtersStatus) return;

			dispatch(
				orderActions.setFilters({
					type: "single",
					key: "status",
					val: valToSend,
				}),
			);
		},
		[dispatch, filtersStatus],
	);

	return (
		<div>
			<label className="block text-xs font-medium text-muted-foreground mb-1">
				Статус
			</label>
			<Select value={filtersStatus ?? ""} onValueChange={handleChange}>
				<SelectTrigger className="w-full cursor-pointer focus-visible:ring-0">
					<SelectValue placeholder="Все статусы" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem className="cursor-pointer" value="all">
						Все статусы
					</SelectItem>
					{Object.values(OrderStatus).map((st) => (
						<SelectItem className="cursor-pointer" key={st} value={st}>
							{StatusLabels[st] ?? st}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export const OrdersFilters = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"w-full flex flex-col md:flex-row md:items-center md:gap-4 gap-3",
				className,
			)}
		>
			<div className="w-full md:w-48">
				<Limit />
			</div>
			<div className="w-full md:w-56">
				<Status />
			</div>
		</div>
	);
};
