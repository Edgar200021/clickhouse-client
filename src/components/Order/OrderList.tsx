import { useNavigate } from "@tanstack/react-router";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useGetOrdersQuery } from "@/store/order/orderApi";
import { orderActions, orderSelectors } from "@/store/order/orderSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { UserRole } from "@/types/user";
import { Pagination } from "../Pagination";
import { Spinner } from "../ui/Spinner";
import { Order } from "./Order";

interface Props {
	className?: string;
}

export const OrderList = ({ className }: Props) => {
	const filters = useAppSelector(orderSelectors.getFilters);
	const { data, error, isLoading } = useGetOrdersQuery(filters);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useHandleError(error);

	if (isLoading)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (!data || error) return;

	return (
		<div className={cn("flex flex-col gap-y-10", className)}>
			<ul className="flex flex-col gap-y-8">
				{data.data.orders.map((order) => (
					<li key={order.number} className="w-full">
						<Order
							type={{
								role: UserRole.Regular,
								order,
							}}
							className="max-w-full"
						/>
					</li>
				))}
			</ul>
			<Pagination
				totalPages={data.data.pageCount}
				currentPage={filters.page || 1}
				onPageChange={(page) => {
					dispatch(
						orderActions.setFilters({
							type: "single",
							key: "page",
							val: page,
						}),
					);
					navigate({
						to: ".",
						search: (prev) => ({ ...prev, page }),
					});
				}}
				className="!mx-auto max-w-fit"
			/>
		</div>
	);
};
