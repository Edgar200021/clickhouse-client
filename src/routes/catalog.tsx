import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SynchronizeSearchParamsWithState } from "@/components/SynchronizeSearchParamsWithState";
import { Routes } from "@/const/routes";
import { catalogSearchParamsSchema } from "@/schemas/searchParams/catalogSearchParams";

export const Route = createFileRoute(Routes.Catalog)({
	component: RouteComponent,
	validateSearch: catalogSearchParamsSchema,
});

function RouteComponent() {
	return (
		<div>
			<Outlet />
			<SynchronizeSearchParamsWithState from={Routes.Catalog} />
		</div>
	);
}
