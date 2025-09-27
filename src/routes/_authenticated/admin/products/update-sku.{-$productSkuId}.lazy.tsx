import { createLazyFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { AdminSearch } from "@/components/Admin/AdminSearch";
import { UpdateProductSkuForm } from "@/components/Admin/forms/productSku/UpdateProductSkuForm";
import { AdminProductSkuFilters } from "@/components/Admin/ProductSku/AdminProductSkuFilters";
import { AdminProductsSkuList } from "@/components/Admin/ProductSku/AdminProductsSkuList";
import { Spinner } from "@/components/ui/Spinner";
import { Routes } from "@/const/routes";
import { useGetProductSkuAdmin } from "@/hooks/useGetProductSkuAdmin";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.ProductsUpdateSku}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { productSkuId } = Route.useParams();
	const { productSkuAdmin, isLoading, isFetching } = useGetProductSkuAdmin(
		Number(productSkuId),
	);

	if (isLoading || isFetching)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (!productSkuAdmin) {
		return (
			<div className="flex flex-col gap-y-20">
				<div className="flex justify-between items-center gap-x-10">
					<h1 className="text-4xl font-bold">
						{!productSkuId
							? "Выберите продукт для обновления"
							: `Продукт по ID ${productSkuId} не найден`}
					</h1>
					<div className="flex items-center gap-x-4 w-2/4 justify-end">
						<AdminSearch
							type="getProductsSkusFiltersSearch"
							placeholder="Поиск продуктов"
						/>
						<AdminProductSkuFilters />
					</div>
				</div>
				<AdminProductsSkuList />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-y-20">
			<h1 className="text-4xl font-bold">Обновление Варианта Продукта</h1>
			<UpdateProductSkuForm
				productSkuAdmin={productSkuAdmin}
				onSuccess={() => toast.success("Вариант продукта успешно обновлен")}
			/>
		</div>
	);
}
