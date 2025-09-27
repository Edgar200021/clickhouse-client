import sortIcon from "@/assets/icons/sort.svg";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { adminActions, adminSelectors } from "@/store/admin/adminSlice";
import type { GetPromocodesRequest } from "@/store/admin/types";
import { useAppDispatch, useAppSelector } from "@/store/store";

export const AdminPromocodeFilters = () => {
	const dispatch = useAppDispatch();
	const limit = useAppSelector(adminSelectors.getPromocodesFiltersLimit);

	const handleChange = <T extends keyof Pick<GetPromocodesRequest, "limit">>(
		key: T,
		val: GetPromocodesRequest[T] | undefined,
	) => {
		dispatch(adminActions.setPromocodesFilters({ key, val }));
	};

	const renderLimitSelect = () => {
		const options = [10, 25, 50, 100];

		return (
			<div>
				<span className="block text-sm font-medium mb-2">
					Показывать на странице
				</span>
				<Select
					value={limit?.toString() ?? ""}
					onValueChange={(val) =>
						handleChange("limit", val ? Number(val) : undefined)
					}
				>
					<SelectTrigger className="cursor-pointer">
						<SelectValue placeholder="По умолчанию" />
					</SelectTrigger>
					<SelectContent>
						{options.map((n) => (
							<SelectItem key={n} value={n.toString()}>
								{n}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		);
	};

	return (
		<Drawer direction="right">
			<DrawerTrigger asChild>
				<Button variant="ghost" className="p-0 cursor-pointer">
					<img src={sortIcon} alt="Фильтры" width={24} height={24} />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Фильтры промокодов</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<div className="p-4 flex flex-col gap-4">{renderLimitSelect()}</div>
			</DrawerContent>
		</Drawer>
	);
};
