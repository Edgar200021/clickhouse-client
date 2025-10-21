import { createLazyFileRoute } from "@tanstack/react-router";
import { OrderList } from "@/components/Order/OrderList";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_regularLayout/_authenticated${Routes.Orders}/`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="py-10">
			<h1 className="mb-10 text-lg md:text-4xl font-bold">Мои заказы</h1>
			<OrderList />
		</div>
	);
}
