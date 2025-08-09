import { createLazyFileRoute } from "@tanstack/react-router";
import { AdminCategoryList } from "@/components/Admin/Category/AdminCategoryList";
import { AdminCategorySearch } from "@/components/Admin/Category/AdminCategorySearch";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.Categories}/`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-y-20">
			<div className="flex justify-between items-center gap-x-10">
				<h1 className="text-4xl font-bold">Список категорий</h1>
				<AdminCategorySearch />
			</div>
			<AdminCategoryList />
		</div>
	);
}
