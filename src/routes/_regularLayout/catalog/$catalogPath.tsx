import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { Category } from "@/components/Category/Category";
import { CategoryBreadcrumbs } from "@/components/Category/CategoryBreadcrumbs";
import { ProductSkuList } from "@/components/ProductSku/ProductSkuList";
import { SynchronizeSearchParamsWithState } from "@/components/SynchronizeSearchParamsWithState";
import { Routes } from "@/const/routes";
import { catalogSearchParamsSchema } from "@/schemas/searchParams/catalogSearchParams";
import { categorySelectors } from "@/store/category/categorySlice";
import { productSkuActions } from "@/store/product-sku/productSkuSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

export const Route = createFileRoute(
	`/_regularLayout${Routes.SpecificCatalog}`,
)({
	component: RouteComponent,
	validateSearch: catalogSearchParamsSchema.omit({ search: true }),
});

function RouteComponent() {
	const path = Route.useParams().catalogPath;
	const category = useAppSelector((state) =>
		categorySelectors.getCategory(state, { type: "path", path }),
	);
	const categories = useAppSelector(categorySelectors.getCategories);
	const dispatch = useAppDispatch();

	if (!category) return redirect({ to: Routes.Catalog });

	const nested = categories.filter((c) => {
		const splitted = c.path.split(".");

		return (
			c.path.startsWith(category.path) &&
			c.path !== category.path &&
			splitted.length ===
				(!category.path.includes(".") ? 2 : category.path.split(".").length + 1)
		);
	});

	return (
		<div>
			<CategoryBreadcrumbs category={category} />
			<div className="pt-6 flex flex-col gap-y-10 mb-20">
				<h2 className="text-4xl font-bold">{category.name}</h2>
				{!!nested.length && (
					<ul className="flex items-center gap-x-6 gap-y-16 flex-wrap max-md:justify-center">
						{nested.map((c) => (
							<li className="w-[280px]" key={c.id}>
								<Category category={c} />
							</li>
						))}
					</ul>
				)}
			</div>
			<SynchronizeSearchParamsWithState from="/_regularLayout/catalog/$catalogPath" />
			<ProductSkuList
				baseFilters={{
					categoryId: category.id,
				}}
			/>
		</div>
	);
}
