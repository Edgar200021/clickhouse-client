import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { UpdateManufacturerForm } from "@/components/Admin/forms/manufacturer/UpdateManufacturerForm";
import { AdminManufacturerList } from "@/components/Admin/Manufacturer/AdminManufacturerList";
import { Spinner } from "@/components/ui/Spinner";
import { Routes } from "@/const/routes";
import { useGetManufacturer } from "@/hooks/useGetManufacturer";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.ManufacturersUpdate}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { manufacturerId } = Route.useParams();
	const { manufacturer, isLoading } = useGetManufacturer(
		Number(manufacturerId),
	);

	if (isLoading)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (!manufacturer) {
		return (
			<div className="flex flex-col gap-y-20">
				<div className="flex justify-between items-center gap-x-10">
					<h1 className="text-4xl font-bold">
						{!manufacturerId
							? "Выберите производителя для обновления"
							: `Производитель по ID ${manufacturerId} не найден`}
					</h1>
				</div>
				<AdminManufacturerList />
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-y-20">
			<h1 className="text-4xl font-bold">Обновление производителя</h1>
			<UpdateManufacturerForm
				manufacturer={manufacturer}
				onSuccess={() => toast.success("Производитель успешно обновлен")}
			/>
		</div>
	);
}
