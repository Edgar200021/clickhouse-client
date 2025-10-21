import {
	createLazyFileRoute,
	Navigate,
	useNavigate,
} from "@tanstack/react-router";
import { SpecificOrder } from "@/components/Order/SpecificOrder";
import { Spinner } from "@/components/ui/Spinner";
import { Routes } from "@/const/routes";
import { useHandleError } from "@/hooks/useHandleError";
import { useGetOrderQuery } from "@/store/order/orderApi";

export const Route = createLazyFileRoute(
	`/_regularLayout/_authenticated${Routes.SpecificOrder}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { orderNumber } = Route.useParams();
	const { data, error, isLoading } = useGetOrderQuery({ orderNumber });
	useHandleError(error);

	if (isLoading)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (!data) {
		return Navigate({ to: Routes.Orders });
	}

	return (
		<div>
			<SpecificOrder order={data.data} />
		</div>
	);
}
