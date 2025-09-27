import { createLazyFileRoute } from "@tanstack/react-router";
import { CategoryBreadcrumbs } from "@/components/Category/CategoryBreadcrumbs";
import { ProductSkuDetail } from "@/components/ProductSku/ProductSkuDetail";
import { ProductSkuList } from "@/components/ProductSku/ProductSkuList";
import { Spinner } from "@/components/ui/Spinner";
import { Routes } from "@/const/routes";
import { useGetProductSku } from "@/hooks/useGetProductSku";
import { categorySelectors } from "@/store/category/categorySlice";
import { useAppSelector } from "@/store/store";

export const Route = createLazyFileRoute(`/_regularLayout${Routes.Product}`)({
	component: RouteComponent,
});

function RouteComponent() {
	const { productSku, isLoading, error } = useGetProductSku(
		Number(Route.useParams().productSkuId),
	);
	const category = useAppSelector((state) =>
		categorySelectors.getCategory(state, {
			type: "id",
			id: productSku?.product.categoryId || 0,
		}),
	);

	if (isLoading)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	return (
		<div>
			{category && (
				<CategoryBreadcrumbs category={category} className="mb-10" />
			)}
			{productSku && (
				<>
					<ProductSkuDetail
						className="mb-24 md:mb-12 "
						productSku={productSku}
					/>
					<ProductSkuList
						baseFilters={{
							categoryId: productSku?.product.categoryId ?? undefined,
							limit: 4,
						}}
						renderElement={{
							fn: (length) => {
								return length > 1 ? (
									<h2 className="text-3xl font-bold mb-10 md:text-4xl">
										С этим товаром также заказывают
									</h2>
								) : null;
							},
							position: "top",
						}}
						withPagination={false}
					/>
				</>
			)}
		</div>
	);
}
