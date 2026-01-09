import { Order } from "@/components/Order/Order";
import { Pagination } from "@/components/Pagination";
import { Spinner } from "@/components/ui/Spinner";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useGetAdminOrdersQuery } from "@/store/admin/adminApi";
import { adminActions, adminSelectors } from "@/store/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { UserRole } from "@/types/user";

type Props = {
	className?: string;
};

export const AdminOrdersList = ({ className }: Props) => {
	const ordersFilters = useAppSelector(adminSelectors.getAdminOrdersFilters);

	const { data, error, isLoading, isFetching } =
		useGetAdminOrdersQuery(ordersFilters);
	useHandleError(error);
	const dispatch = useAppDispatch();

	if (isLoading)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (!data) return null;

	return (
		<div className="flex flex-col gap-y-10 ">
			<ul className={cn("flex flex-wrap gap-10", className)}>
				{data.data.orders.map((order) => (
					<li className={isFetching ? "opacity-70" : ""} key={order.id}>
						<Order
							type={{
								role: UserRole.Admin,
								order,
							}}
						/>
					</li>
				))}
			</ul>
			<Pagination
				className="pt-10 mx-auto"
				currentPage={ordersFilters.page || 1}
				totalPages={data.data.pageCount}
				onPageChange={(page) =>
					dispatch(adminActions.setOrdersFilters({ key: "page", val: page }))
				}
			/>
		</div>
	);
};
