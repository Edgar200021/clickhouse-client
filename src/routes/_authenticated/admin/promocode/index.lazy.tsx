import { createLazyFileRoute } from "@tanstack/react-router";
import { AdminSearch } from "@/components/Admin/AdminSearch";
import { AdminPromocodeFilters } from "@/components/Admin/Promocode/AdminPromocodeFilters";
import { AdminPromocodeList } from "@/components/Admin/Promocode/AdminPromocodeList";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.Promocode}/`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-y-20">
			<div className="flex justify-between items-center gap-x-10">
				<h1 className="text-4xl font-bold">Список промокодов</h1>
				<div className="flex items-center gap-x-4 w-2/3 justify-end">
					<AdminSearch
						type="getPromocodesFiltersSearch"
						placeholder="Введите код"
					/>
					<AdminPromocodeFilters />
				</div>
			</div>
			<AdminPromocodeList />
		</div>
	);
}
