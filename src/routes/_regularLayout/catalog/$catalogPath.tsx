import { createFileRoute, redirect } from "@tanstack/react-router";
import { Category } from "@/components/Category/Category";
import { CategoryBreadcrumbs } from "@/components/Category/CategoryBreadcrumbs";
import { ProductSkuFilters } from "@/components/ProductSku/Filters/ProductSkuFilters";
import { ProductSkuList } from "@/components/ProductSku/ProductSkuList";
import { SynchronizeSearchParamsWithState } from "@/components/SynchronizeSearchParamsWithState";
import { Routes } from "@/const/routes";
import { catalogSearchParamsSchema } from "@/schemas/searchParams/catalogSearchParams";
import { categorySelectors } from "@/store/category/categorySlice";
import { useAppSelector } from "@/store/store";

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
		<div className="pt-10">
			<CategoryBreadcrumbs category={category} />
			<div className="pt-6 flex flex-col gap-y-10 mb-20">
				<div className="flex items-center justify-between">
					<h1 className="font-bold text-4xl">{category.name}</h1>
					<ProductSkuFilters />
				</div>
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
