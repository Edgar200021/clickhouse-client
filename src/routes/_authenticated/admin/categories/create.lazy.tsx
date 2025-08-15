import { createLazyFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { CreateCategoryForm } from "@/components/Admin/forms/category/CreateCategoryForm";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.CategoriesCreate}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-y-20">
			<h1 className="text-4xl font-bold">Обновление категории</h1>

			<CreateCategoryForm
				onSuccess={() => toast.success("Категория успешно создан")}
			/>
		</div>
	);
}
