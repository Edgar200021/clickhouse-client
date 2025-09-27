import { Pagination } from "@/components/Pagination";
import { Spinner } from "@/components/ui/Spinner";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useGetProductsQuery } from "@/store/admin/adminApi";
import { adminActions, adminSelectors } from "@/store/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { AdminProduct } from "./AdminProduct";

type Props = {
	className?: string;
};

export const AdminProductList = ({ className }: Props) => {
	const productFilters = useAppSelector(adminSelectors.getProductFilters);
	const { data, error, isLoading } = useGetProductsQuery(productFilters);
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
				{data.data.products.map((p) => (
					<li key={p.id}>
						<AdminProduct product={p} />
					</li>
				))}
			</ul>
			<Pagination
				className="pt-10 mx-auto"
				currentPage={productFilters.page || 1}
				totalPages={data.data.pageCount}
				onPageChange={(page) =>
					dispatch(adminActions.setProductFilters({ key: "page", val: page }))
				}
			/>
		</div>
	);
};
