import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useGetOrdersQuery } from "@/store/order/orderApi";
import { Spinner } from "../ui/Spinner";
import { Order } from "./Order";

interface Props {
	className?: string;
}

export const OrderList = ({ className }: Props) => {
	const { data, error, isLoading } = useGetOrdersQuery(null);
	useHandleError(error);

	if (isLoading)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	return (
		<div className={cn("", className)}>
			<ul className="flex flex-col gap-y-8">
				{data?.data.map((order) => (
					<li key={order.number} className="w-full">
						<Order order={order} />
					</li>
				))}
			</ul>
		</div>
	);
};
