import { createFileRoute } from "@tanstack/react-router";
import { CategoryList } from "@/components/Category/CategoryList";
import { ProductSkuFilters } from "@/components/ProductSku/Filters/ProductSkuFilters";
import { ProductSkuList } from "@/components/ProductSku/ProductSkuList";
import { SynchronizeSearchParamsWithState } from "@/components/SynchronizeSearchParamsWithState";
import { Routes } from "@/const/routes";
import { catalogSearchParamsSchema } from "@/schemas/searchParams/catalogSearchParams";

export const Route = createFileRoute(`/_regularLayout${Routes.Catalog}/`)({
	component: RouteComponent,
	validateSearch: catalogSearchParamsSchema.pick({
		search: true,
		inStock: true,
		withDiscount: true,
		page: true,
	}),
});

function RouteComponent() {
	return (
		<div className="pt-10 flex flex-col gap-y-10">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-4xl">Каталог</h1>
				<ProductSkuFilters />
			</div>
			<CategoryList className="mb-12" />
			<ProductSkuList
				showWhenKeysProvided={["search", "inStock", "withDiscount"]}
			/>
			<SynchronizeSearchParamsWithState from="/_regularLayout/catalog/" />
		</div>
	);
}
