import { createLazyFileRoute } from "@tanstack/react-router";
import { CategoryList } from "@/components/Category/CategoryList";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(`/_regularLayout${Routes.Catalog}`)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="pt-10 flex flex-col gap-y-10">
			<h1 className="font-bold text-4xl">Каталог</h1>
			<CategoryList />
		</div>
	);
}
