import { createLazyFileRoute } from "@tanstack/react-router";
import { OrderList } from "@/components/Order/OrderList";
import { OrdersFilters } from "@/components/Order/OrdersFilters";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_regularLayout/_authenticated${Routes.Orders.Base}/`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="py-10">
			<div className="flex md:items-center justify-between gap-x-5 w-full mb-10 ">
				<h1 className="text-lg md:text-4xl font-bold">Мои заказы</h1>
				<OrdersFilters className="w-fit" />
			</div>
			<OrderList />
		</div>
	);
}
