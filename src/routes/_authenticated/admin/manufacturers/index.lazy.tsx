import { createLazyFileRoute } from "@tanstack/react-router";
import { AdminManufacturerList } from "@/components/Admin/Manufacturer/AdminManufacturerList";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.Manufacturers}/`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-y-20">
			<h1 className="text-4xl font-bold">Список производителей</h1>
			<AdminManufacturerList />
		</div>
	);
}
