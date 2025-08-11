import { createLazyFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { AdminCategoryList } from "@/components/Admin/Category/AdminCategoryList";
import { AdminCategorySearch } from "@/components/Admin/Category/AdminCategorySearch";
import { UpdateCategoryForm } from "@/components/Admin/forms/category/UpdateCategoryForm";
import { Routes } from "@/const/routes";
import { categorySelectors } from "@/store/category/categorySlice";
import { useAppSelector } from "@/store/store";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.CategoriesUpdate}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { categoryId } = Route.useParams();
	const category = useAppSelector((state) =>
		categorySelectors.getCategory(state, Number(categoryId) || -1),
	);

	if (!categoryId || !category) {
		return (
			<div className="flex flex-col gap-y-20">
				<div className="flex justify-between items-center gap-x-10">
					<h1 className="text-4xl font-bold">
						{!categoryId
							? "Выберите категорию для обновления"
							: `Категорий по ID ${categoryId} не найден`}
					</h1>
					<AdminCategorySearch />
				</div>
				<AdminCategoryList />
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-y-20">
			<h1 className="text-4xl font-bold">Обновление категории</h1>
			<UpdateCategoryForm
				category={category}
				onSuccess={() => toast.success("Category successfully updated")}
			/>
		</div>
	);
}
