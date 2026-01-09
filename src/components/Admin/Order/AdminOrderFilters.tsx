import sortIcon from "@/assets/icons/sort.svg";
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
import { GetOrdersMaxLimit } from "@/const/schema";
import { adminActions, adminSelectors } from "@/store/admin/adminSlice";
import type { GetAdminOrdersRequest } from "@/store/admin/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { OrderStatus } from "@/types/order"; // или просто вставь enum сюда, если он не экспортирован

export const AdminOrderFilters = () => {
	const dispatch = useAppDispatch();
	const { limit, status, search } = useAppSelector(
		adminSelectors.getAdminOrdersFilters,
	);

	const handleChange = <
		T extends keyof Pick<GetAdminOrdersRequest, "limit" | "status">,
	>(
		key: T,
		val: GetAdminOrdersRequest[T] | undefined,
	) => {
		dispatch(adminActions.setOrdersFilters({ key, val }));
	};

	// --- Фильтр "Показывать на странице"
	const renderLimitSelect = () => {
		const options = [10, 25, 50, 100].filter((val) => val <= GetOrdersMaxLimit);

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

	const renderStatusSelect = () => {
		const statuses = Object.entries(OrderStatus);

		return (
			<div>
				<span className="block text-sm font-medium mb-2">Статус заказа</span>
				<Select
					value={status ?? ""}
					onValueChange={(val) =>
						handleChange(
							"status",
							val !== "all" ? (val as OrderStatus) : undefined,
						)
					}
				>
					<SelectTrigger className="cursor-pointer">
						<SelectValue placeholder="Все статусы" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Все статусы</SelectItem>
						{statuses.map(([key, value]) => (
							<SelectItem key={key} value={value}>
								{translateStatus(value)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		);
	};

	const translateStatus = (status: OrderStatus) => {
		switch (status) {
			case OrderStatus.Cancelled:
				return "Отменён";
			case OrderStatus.Delivered:
				return "Доставлен";
			case OrderStatus.Paid:
				return "Оплачен";
			case OrderStatus.Pending:
				return "В ожидании";
			case OrderStatus.Shipped:
				return "Отправлен";
			default:
				return status;
		}
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
					<DrawerTitle>Фильтры заказов</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<div className="p-4 flex flex-col gap-4">
					{renderLimitSelect()}
					{renderStatusSelect()}
				</div>
			</DrawerContent>
		</Drawer>
	);
};
