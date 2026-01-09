import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactElement } from "react";
import arrowIcon from "@/assets/icons/arrow.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Routes } from "@/const/routes";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useLogoutMutation } from "@/store/auth/authApi";
import { Button } from "../ui/button";
import { Logo } from "../ui/Logo";

type Props = {
	className?: string;
};

type NavItem = {
	id: string;
	label: string;
	icon?: string | ReactElement;
	to?: string;
	children?: NavItem[];
};

export const Navbar = ({ className }: Props) => {
	const [logout, { isLoading, error }] = useLogoutMutation();
	const navigate = useNavigate();

	useHandleError(error);

	const navItems: NavItem[] = [
		{
			id: "categories",
			label: "Категории",
			children: [
				{
					id: "categories-list",
					label: "Список категорий",
					to: Routes.Admin.Categories,
				},
				{
					id: "categories-create",
					label: "Создать категорию",
					to: Routes.Admin.CategoriesCreate,
				},
				{
					id: "categories-update",
					label: "Обновить категорию",
					to: Routes.Admin.CategoriesUpdate,
				},
			],
		},
		{
			id: "products",
			label: "Продукты",
			children: [
				{
					id: "products-list",
					label: "Список продуктов",
					to: Routes.Admin.Products,
				},
				{
					id: "products-create",
					label: "Создать продукт",
					to: Routes.Admin.ProductsCreate,
				},
				{
					id: "products-update",
					label: "Обновить продукт",
					to: Routes.Admin.ProductsUpdate,
				},
			],
		},
		{
			id: "manufacturers",
			label: "Производители",
			children: [
				{
					id: "manufacturers-list",
					label: "Список производителей",
					to: Routes.Admin.Manufacturers,
				},
				{
					id: "manufacturers-add",
					label: "Добавить производителя",
					to: Routes.Admin.ManufacturersCreate,
				},
				{
					id: "manufacturers-update",
					label: "Обновить производителя",
					to: Routes.Admin.ManufacturersUpdate,
				},
			],
		},
		{
			id: "users",
			label: "Пользователи",
			children: [
				{
					id: "users-list",
					label: "Список пользователей",
					to: Routes.Admin.Users,
				},
			],
		},
		{
			id: "promocode",
			label: "Промокоды",
			children: [
				{
					id: "promocode-list",
					label: "Список промокодов",
					to: Routes.Admin.Promocode,
				},
				{
					id: "promocode-create",
					label: "Создать промокод",
					to: Routes.Admin.PromocodeCreate,
				},
				{
					id: "promocode-update",
					label: "Обновить промокод",
					to: Routes.Admin.PromocodeUpdate,
				},
			],
		},
		{
			id: "order",
			label: "Заказы",
			children: [
				{
					id: "promocode-list",
					label: "Список заказов",
					to: Routes.Admin.Orders,
				},
			],
		},
	];

	const renderNavItem = (item: NavItem) => {
		if (item.children?.length)
			return (
				<li key={item.id} className="w-full">
					<Collapsible>
						<CollapsibleTrigger asChild>
							<Button
								variant="ghost"
								className={cn(
									"cursor-pointer group data-[state=open]:bg-orange-200 data-[state=open]:text-orange-500 rounded-[8px] px-2 py-3 flex gap-x-2 hover:bg-orange-200 hover:text-orange-500 w-full justify-start text-lg",
								)}
							>
								{item.icon && typeof item.icon === "string" ? (
									<img
										width={16}
										height={16}
										src={item.icon}
										alt={item.label}
									/>
								) : (
									item.icon
								)}
								<span>{item.label}</span>
								<img
									className="transition-transform duration-300 ease group-data-[state=open]:-rotate-180 ml-auto"
									width={14}
									height={8}
									src={arrowIcon}
									alt="arrow"
								/>
							</Button>
						</CollapsibleTrigger>
						<CollapsibleContent
							className={cn(
								"overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
							)}
						>
							<ul className="flex flex-col gap-y-2 pt-2 pl-5 items-start">
								{item.children.map((item) => renderNavItem(item))}
							</ul>
						</CollapsibleContent>
					</Collapsible>
				</li>
			);

		return (
			<li key={item.id} className="w-full">
				<Link
					className="hover:text-orange-500 transition-colors duration-300 ease [&.active]:text-orange-500 text-lg"
					activeOptions={{
						exact: true,
					}}
					to={item.to}
				>
					{item.label}
				</Link>
			</li>
		);
	};

	return (
		<div
			className={cn(
				"flex flex-col gap-y-12 w-[240px] text-[#3a3541] bg-white p-10 sticky top-0 left-0 h-screen",
				className,
			)}
		>
			<Logo to={Routes.Admin.Base} />
			<ul className="flex flex-col w-full">{navItems.map(renderNavItem)}</ul>
			<Button
				className="cursor-pointer w-7 p-0 justify-end mt-auto hover:!bg-transparent"
				disabled={isLoading}
				onClick={async () => {
					await logout(null).unwrap();
					navigate({
						to: Routes.Main,
					});
				}}
				variant="ghost"
			>
				<img width={28} height={28} src={logoutIcon} alt="выход" />
			</Button>
		</div>
	);
};
