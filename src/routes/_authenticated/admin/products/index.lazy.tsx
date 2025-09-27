import { createLazyFileRoute } from "@tanstack/react-router";
import { AdminSearch } from "@/components/Admin/AdminSearch";
import { AdminProductFilters } from "@/components/Admin/Product/AdminProductFilters";
import { AdminProductList } from "@/components/Admin/Product/AdminProductList";
import { AdminProductSkuFilters } from "@/components/Admin/ProductSku/AdminProductSkuFilters";
import { AdminProductsSkuList } from "@/components/Admin/ProductSku/AdminProductsSkuList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.Products}/`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-y-10">
			<Tabs defaultValue="products">
				<TabsList className="mb-10">
					<TabsTrigger
						value="products"
						className="cursor-pointer text-xl p-4 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md"
					>
						Продукты
					</TabsTrigger>
					<TabsTrigger
						value="variants"
						className="cursor-pointer text-xl p-4 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md"
					>
						Варианты продукта
					</TabsTrigger>
				</TabsList>

				<TabsContent value="products">
					<div className="flex justify-between items-center gap-x-10 mb-6">
						<h1 className="text-4xl font-bold">Список продуктов</h1>
						<div className="flex items-center gap-x-4 w-2/3 justify-end">
							<AdminSearch
								type="getProductFiltersSearch"
								placeholder="Поиск продуктов"
							/>
							<AdminProductFilters />
						</div>
					</div>
					<AdminProductList />
				</TabsContent>

				<TabsContent value="variants">
					<div className="flex justify-between items-center gap-x-10 mb-6">
						<h1 className="text-4xl font-bold mb-6">Варианты продукта</h1>
						<div className="flex items-center gap-x-4 w-2/3 justify-end">
							<AdminSearch
								type="getProductsSkusFiltersSearch"
								placeholder="Поиск продуктов"
							/>
							<AdminProductSkuFilters />
						</div>
					</div>
					<AdminProductsSkuList />
				</TabsContent>
			</Tabs>
		</div>
	);
}
