import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { SpecificOrder } from "@/components/Order/SpecificOrder";
import { Spinner } from "@/components/ui/Spinner";
import { Routes } from "@/const/routes";
import { useHandleError } from "@/hooks/useHandleError";
import { useGetAdminOrderQuery } from "@/store/admin/adminApi";
import { UserRole } from "@/types/user";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.SpecificOrder}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { orderNumber } = Route.useParams();

	const { data, isLoading, error } = useGetAdminOrderQuery({
		orderNumber,
	});
	useHandleError(error);

	if (isLoading)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (!data || error) {
		return <Navigate to={Routes.Admin.Orders} />;
	}

	return (
		<div className="flex flex-col gap-y-20">
			<h1 className="text-4xl font-bold">Заказ # {orderNumber}</h1>
			<SpecificOrder
				type={{
					role: UserRole.Admin,
					order: data.data,
				}}
			/>
		</div>
	);
}
