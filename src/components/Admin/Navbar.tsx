import { Link, useNavigate } from "@tanstack/react-router";
import arrowIcon from "@/assets/icons/arrow.svg";
import ecommerceIcon from "@/assets/icons/ecommerce.svg";
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
	label: string;
	icon?: string;
	to?: string;
	children?: NavItem[];
};

export const Navbar = ({ className }: Props) => {
	const [logout, { isLoading, error }] = useLogoutMutation();
	const navigate = useNavigate();

	useHandleError(error);

	const navItems: NavItem[] = [
		{
			label: "E-commerce",
			icon: ecommerceIcon,
			children: [
				{
					label: "Категории",
					children: [
						{ label: "Список категорий", to: Routes.Admin.Categories },
						{ label: "Создать категорию", to: Routes.Admin.CategoriesCreate },
						{ label: "Обновить категорию", to: Routes.Admin.CategoriesUpdate },
					],
				},
				{
					label: "Продукты",
					children: [
						{ label: "Список продуктов", to: Routes.Admin.Products },
						{ label: "Создать продукт", to: Routes.Admin.ProductsCreate },
						{ label: "Обновить продукт", to: Routes.Admin.ProductsUpdate },
					],
				},
				{
					label: "Производители",
					children: [
						{ label: "Список производителей", to: Routes.Admin.Manufacturers },
						{
							label: "Добавить производителя",
							to: Routes.Admin.ManufacturersCreate,
						},
						{
							label: "Обновить производителя",
							to: Routes.Admin.ManufacturersUpdate,
						},
					],
				},
				{
					label: "Пользователи",
					children: [{ label: "Список пользователей", to: Routes.Admin.Users }],
				},
			],
		},
	];

	const renderNavItem = (item: NavItem) => {
		if (item.children?.length)
			return (
				<li className="w-full">
					<Collapsible>
						<CollapsibleTrigger asChild>
							<Button
								variant="ghost"
								className={cn(
									"cursor-pointer group data-[state=open]:bg-orange-200 data-[state=open]:text-orange-500 rounded-[8px] px-2 py-3 flex gap-x-2 hover:bg-orange-200 hover:text-orange-500 w-full justify-start text-lg",
								)}
							>
								{item.icon && (
									<img
										width={16}
										height={16}
										src={item.icon}
										alt={item.label}
									/>
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
			<li className="w-full">
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
				"flex flex-col gap-y-12 w-[240px] text-[#3a3541] bg-white p-10",
				className,
			)}
		>
			<Logo to={Routes.Admin.Base} />
			<ul className="flex flex-col gap-y-10 w-full">
				{navItems.map(renderNavItem)}
			</ul>
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
