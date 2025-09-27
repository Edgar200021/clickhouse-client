import { createLazyFileRoute } from "@tanstack/react-router";
import { CreatePromocodeForm } from "@/components/Admin/forms/promocode/CreatePromocodeForm";
import { Routes } from "@/const/routes";
import toast from "react-hot-toast";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.PromocodeCreate}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-y-20">
			<h1 className="text-4xl font-bold">Создаение промокода</h1>

			<CreatePromocodeForm
				onSuccess={() => toast.success("Промокод успешно создан")}
			/>
		</div>
	);
}
