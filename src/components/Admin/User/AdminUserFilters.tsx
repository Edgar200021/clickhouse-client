import { useDispatch, useSelector } from "react-redux";
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
import type { GetUsersRequest } from "@/store/admin/types";

export const AdminUserFilters = () => {
	const dispatch = useDispatch();
	const isBanned = useSelector(adminSelectors.getUsersFiltersIsBanned);
	const isVerified = useSelector(adminSelectors.getUsersFiltersIsVerified);
	const limit = useSelector(adminSelectors.getUsersFiltersLimit);

	const handleChange = <
		T extends keyof Pick<GetUsersRequest, "isBanned" | "isVerified" | "limit">,
	>(
		key: T,
		val: GetUsersRequest[T] | undefined,
	) => {
		dispatch(adminActions.setUsersFilters({ key, val }));
	};

	const renderBooleanSelect = (
		label: string,
		key: keyof Pick<GetUsersRequest, "isBanned" | "isVerified">,
		value: boolean | undefined,
	) => (
		<div>
			<span className="block text-sm font-medium mb-2">{label}</span>
			<Select
				value={value === undefined ? "all" : value ? "true" : "false"}
				onValueChange={(val) =>
					handleChange(key, val === "all" ? undefined : val === "true")
				}
			>
				<SelectTrigger className="cursor-pointer">
					<SelectValue placeholder="Все" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Все</SelectItem>
					<SelectItem value="true">Да</SelectItem>
					<SelectItem value="false">Нет</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);

	const renderLimitSelect = () => {
		const options = [10, 25, 50, 100, 150, 200, 250, 300];
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
					<DrawerTitle>Фильтры пользователей</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<div className="p-4 flex flex-col gap-4">
					{renderBooleanSelect("Верифицирован", "isVerified", isVerified)}
					{renderBooleanSelect("Заблокирован", "isBanned", isBanned)}
					{renderLimitSelect()}
				</div>
			</DrawerContent>
		</Drawer>
	);
};
