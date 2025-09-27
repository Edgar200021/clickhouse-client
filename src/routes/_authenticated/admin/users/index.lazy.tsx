import { createLazyFileRoute } from "@tanstack/react-router";
import { AdminSearch } from "@/components/Admin/AdminSearch";
import { AdminUserFilters } from "@/components/Admin/User/AdminUserFilters";
import { AdminUserList } from "@/components/Admin/User/AdminUserList";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.Users}/`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-y-20">
			<div className="flex justify-between items-center gap-x-10">
				<h1 className="text-4xl font-bold">Список пользователей</h1>
				<div className="flex items-center gap-x-4 w-2/3 justify-end">
					<AdminSearch
						type="getUsersFiltersSearch"
						placeholder="Введите эл.почту пользователя"
					/>
					<AdminUserFilters />
				</div>
			</div>
			<AdminUserList />
		</div>
	);
}
