import { createLazyFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { CreateProductForm } from "@/components/Admin/forms/product/CreateProductForm";
import { AdminManufacturerList } from "@/components/Admin/Manufacturer/AdminManufacturerList";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.ProductsCreate}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-y-20">
			<h1 className="text-4xl font-bold">Создание продукта</h1>

			<CreateProductForm
				onSuccess={() => toast.success("Продукт успешно создан")}
			/>
			<AdminManufacturerList hidden />
		</div>
	);
}
