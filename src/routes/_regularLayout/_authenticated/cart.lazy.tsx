import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AddCartItemBySku } from "@/components/Cart/AddCartItemBySku";
import { CartItemList } from "@/components/Cart/CartItemList";
import { ProductSkuList } from "@/components/ProductSku/ProductSkuList";
import { Routes } from "@/const/routes";
import { categorySelectors } from "@/store/category/categorySlice";
import { useAppSelector } from "@/store/store";

export const Route = createLazyFileRoute(
	`/_regularLayout/_authenticated${Routes.Cart}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	const categories = useAppSelector(categorySelectors.getCategories);
	const [randomCategory] = useState(() => {
		if (categories.length === 0) return null;
		const randomIndex = Math.floor(Math.random() * categories.length);
		return categories[randomIndex];
	});

	return (
		<div className="flex justify-between flex-col gap-y-10  lg:flex-row lg:gap-x-10 lg:gap-y-0">
			<div className="flex flex-col gap-y-10  lg:max-w-[750px] w-full max-w-full ">
				<div className="flex items-center justify-between gap-x-3">
					<span className="font-bold text-lg md:text-2xl lg:text-4xl">
						Корзина
					</span>
					<AddCartItemBySku />
				</div>
				<CartItemList className="w-full" />
			</div>
			<div className="flex flex-col gap-y-[22px] lg:w-fit w-full">
				<ProductSkuList
					className="flex flex-col gap-y-4 [&>li]:border-b-2 [&>li]:border-gray-200 mb-0 lg:w-fit w-full items-center lg:items-start"
					withPagination={false}
					renderElement={{
						fn: (length) => {
							return length > 1 ? (
								<h2 className="text-lg  mb-2 lg:mb-9 lg:text-[30px] pt-10 ">
									Может быть интересно
								</h2>
							) : null;
						},
						position: "top",
					}}
					type="cart"
					baseFilters={{
						limit: 3,
						categoryId: randomCategory?.id ?? undefined,
					}}
				/>
				<Link
					className="text-lg w-fit transition-transform duration-300 ease-out hover:-translate-y-1 max-lg:mx-auto"
					to={randomCategory?.id ? Routes.SpecificCatalog : Routes.Catalog}
					params={{
						...(randomCategory?.id ? { catalogPath: randomCategory.path } : {}),
					}}
				>
					&larr;Все результаты
				</Link>
			</div>
		</div>
	);
}
