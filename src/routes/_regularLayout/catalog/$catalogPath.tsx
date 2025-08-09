import { createFileRoute } from "@tanstack/react-router";
import { SynchronizeSearchParamsWithState } from "@/components/SynchronizeSearchParamsWithState";
import { Routes } from "@/const/routes";
import { catalogSearchParamsSchema } from "@/schemas/searchParams/catalogSearchParams";

export const Route = createFileRoute(
	`/_regularLayout${Routes.SpecificCatalog}`,
)({
	component: RouteComponent,
	validateSearch: catalogSearchParamsSchema,
});

function RouteComponent() {
	const path = Route.useParams().catalogPath;

	return (
		<div>
			Hello "/catalog/$catalogPath"!
			<SynchronizeSearchParamsWithState from="/catalog/$catalogPath" />
		</div>
	);
}
