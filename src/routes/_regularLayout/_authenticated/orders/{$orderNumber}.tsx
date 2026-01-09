import {
	createFileRoute,
	Navigate,
	useLayoutEffect,
} from "@tanstack/react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { SpecificOrder } from "@/components/Order/SpecificOrder";
import { Spinner } from "@/components/ui/Spinner";
import { Routes } from "@/const/routes";
import { useHandleError } from "@/hooks/useHandleError";
import { orderSuccessSearchParamsSchema } from "@/schemas/searchParams/orderSuccessSearchParams.schema";
import { useLazyGetOrderQuery } from "@/store/order/orderApi";
import {useCancelPaymentMutation, useCapturePaymentMutation} from "@/store/payment/paymentApi";
import { UserRole } from "@/types/user";

export const Route = createFileRoute(
	`/_regularLayout/_authenticated${Routes.Orders.SpecificOrder}`,
)({
	component: RouteComponent,
	validateSearch: orderSuccessSearchParamsSchema,
});

function RouteComponent() {
	const { sessionId, type } = Route.useSearch();
	const { orderNumber } = Route.useParams();
	const [getOrder, { data, error, isLoading }] = useLazyGetOrderQuery();
	const [capturePayment, { isLoading: isCaptureLoading, error: captureError }] =
		useCapturePaymentMutation();
	const [cancelPayment, { isLoading: isCancelLoading, error: cancelError }] =
		useCancelPaymentMutation();
	useHandleError(error || captureError || cancelError);

	useLayoutEffect(() => {
		(async () => {
			try {
				if (sessionId) {
					await (type
							? cancelPayment({ sessionId }).unwrap()
							: capturePayment({ sessionId }).unwrap()
					)

						toast.success(type ? 'Платёж отменён' : `Заказ ${orderNumber} успешно оплачен`);
				}
			} finally {
				await getOrder({ orderNumber }).unwrap();
			}
		})();
	}, [orderNumber, sessionId, type]);

	if (isLoading || isCaptureLoading ||   isCancelLoading || (!data && !error))
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (!data) {
		return Navigate({ to: Routes.Orders.Base });
	}

	return (
		<div>
			<SpecificOrder
				type={{
					role: UserRole.Regular,
					order: data.data,
				}}
			/>
		</div>
	);
}