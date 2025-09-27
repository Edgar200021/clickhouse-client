import { Spinner } from "@/components/ui/Spinner";
import { useHandleError } from "@/hooks/useHandleError";
import { useGetPromocodesQuery } from "@/store/admin/adminApi";
import { adminActions, adminSelectors } from "@/store/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { AdminPromocode } from "./AdminPromocode";
import { Pagination } from "@/components/Pagination";

export const AdminPromocodeList = () => {
	const filters = useAppSelector(adminSelectors.getPromocodesFilters);

	const { data, error, isLoading, isFetching } = useGetPromocodesQuery(filters);
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
		<>
			<ul className="flex flex-wrap gap-5 justify-around">
				{data.data.promocodes.map((p) => (
					<li className={isFetching ? "opacity-70" : ""} key={p.id}>
						<AdminPromocode promocode={p} />
					</li>
				))}
			</ul>
			<Pagination
				className="pt-10 mx-auto"
				currentPage={filters.page || 1}
				totalPages={data.data.pageCount}
				onPageChange={(page) =>
					dispatch(adminActions.setPromocodesFilters({ key: "page", val: page }))
				}
			/>
		</>
	);
};
