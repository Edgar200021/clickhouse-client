import { Pagination } from "@/components/Pagination";
import { Spinner } from "@/components/ui/Spinner";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useGetProductsSkusQuery } from "@/store/admin/adminApi";
import { adminActions, adminSelectors } from "@/store/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { AdminProductSku } from "./AdminProductSku";

type Props = {
	className?: string;
};

export const AdminProductsSkuList = ({ className }: Props) => {
	const productsSkusFilters = useAppSelector(
		adminSelectors.getProductsSkusFilters,
	);

	const { data, error, isLoading, isFetching } =
		useGetProductsSkusQuery(productsSkusFilters);
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
				{data.data.productsSkus.map((p) => (
					<li className={isFetching ? "opacity-70" : ""} key={p.id}>
						<AdminProductSku productSku={p} />
					</li>
				))}
			</ul>
			<Pagination
				className="pt-10 mx-auto"
				currentPage={productsSkusFilters.page || 1}
				totalPages={data.data.pageCount}
				onPageChange={(page) =>
					dispatch(
						adminActions.setProductsSkusFilters({ key: "page", val: page }),
					)
				}
			/>
		</div>
	);
};
