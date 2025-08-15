import { createLazyFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { CreateManufacturerForm } from "@/components/Admin/forms/manufacturer/CreateManufacturerForm";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.ManufacturersCreate}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-y-20">
			<h1 className="text-4xl font-bold">Добавить производителя</h1>
			<CreateManufacturerForm
				onSuccess={() => toast.success("Производитель успешно создан")}
			/>
		</div>
	);
}
