import { createLazyFileRoute } from "@tanstack/react-router";
import { AdminSearch } from "@/components/Admin/AdminSearch";
import { UpdatePromocodeForm } from "@/components/Admin/forms/promocode/UpdatePromocodeForm";
import { AdminPromocodeFilters } from "@/components/Admin/Promocode/AdminPromocodeFilters";
import { AdminPromocodeList } from "@/components/Admin/Promocode/AdminPromocodeList";
import { Spinner } from "@/components/ui/Spinner";
import { Routes } from "@/const/routes";
import { useGetPromocode } from "@/hooks/useGetPromocode";
import toast from "react-hot-toast";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.PromocodeUpdate}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { promocodeId } = Route.useParams();
	const { promocode, isLoading, isFetching } = useGetPromocode(
		Number(promocodeId),
	);

	if (isLoading || isFetching)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (!promocode) {
		return (
			<div className="flex flex-col gap-y-20">
				<div className="flex justify-between items-center gap-x-10">
					<h1 className="text-4xl font-bold">
						{!promocodeId
							? "Выберите продукт для обновления"
							: `Промокод по ID ${promocodeId} не найден`}
					</h1>
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

	return (
		<div className="flex flex-col gap-y-20">
			<h1 className="text-4xl font-bold">Обновление Промокода</h1>
			<UpdatePromocodeForm
				promocode={promocode}
				onSuccess={() => toast.success("Промокод успешно обновлен")}
			/>
		</div>
	);
}
