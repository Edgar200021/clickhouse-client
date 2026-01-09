import { createLazyFileRoute } from "@tanstack/react-router";
import { AdminSearch } from "@/components/Admin/AdminSearch";
import { AdminOrderFilters } from "@/components/Admin/Order/AdminOrderFilters";
import { AdminOrdersList } from "@/components/Admin/Order/AdminOrdersList";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.Orders}/`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-y-20">
			<div className="flex justify-between items-center gap-x-10">
				<h1 className="text-4xl font-bold">Список заказов</h1>
				<div className="flex items-center gap-x-4 w-2/3 justify-end">
					<AdminSearch
						type="getAdminOrdersFiltersSearch"
						placeholder="Введите номер заказа или имя/email пользователя"
					/>
					<AdminOrderFilters />
				</div>
			</div>
			<AdminOrdersList />
		</div>
	);
}
