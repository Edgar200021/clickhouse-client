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
		<div className="pt-80">
			<CreateCategoryForm
				onSuccess={() => toast.success("Category successfully created")}
			/>
		</div>
	);
}
