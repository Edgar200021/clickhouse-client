import { createLazyFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { AdminSearch } from "@/components/Admin/AdminSearch";
import { CreateProductSkuForm } from "@/components/Admin/forms/productSku/CreateProductSkuForm";
import { AdminProductFilters } from "@/components/Admin/Product/AdminProductFilters";
import { AdminProductList } from "@/components/Admin/Product/AdminProductList";
import { Spinner } from "@/components/ui/Spinner";
import { Routes } from "@/const/routes";
import { useGetProduct } from "@/hooks/useGetProduct";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.ProductsCreateSku}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { productId } = Route.useParams();
	const { isLoading, productAdmin, error } = useGetProduct(Number(productId));

	if (isLoading)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (!productAdmin) {
		return (
			<div className="flex flex-col gap-y-20">
				<div className="flex justify-between items-center gap-x-10">
					<h1 className="text-4xl font-bold">
						Продукт по ID ${productId} не найден
					</h1>
					<div className="flex items-center gap-x-4 w-2/4 justify-end">
						<AdminSearch
							type="getProductFiltersSearch"
							placeholder="Поиск продуктов"
						/>
						<AdminProductFilters />
					</div>
				</div>
				<AdminProductList />
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-y-20">
			<h1 className="text-4xl font-bold">Создание варианта продукта</h1>
			<CreateProductSkuForm
				productAdmin={productAdmin}
				onSuccess={() => toast.success("Вариан продукта успешно создан")}
			/>
		</div>
	);
}
