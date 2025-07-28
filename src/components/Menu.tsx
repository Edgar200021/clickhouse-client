import { Link } from "@tanstack/react-router";
import { useState } from "react";
import closeIcon from "@/assets/icons/close.svg";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import { HeaderPart } from "./Header/HeaderPart";
import { Button } from "./ui/button";
import { Logo } from "./ui/Logo";

type Props = {
	className?: string;
};

export const Menu = ({ className }: Props) => {
	const [open, setOpen] = useState(false);
	return (
		<Drawer open={open} onOpenChange={setOpen} direction="left">
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					className={cn(
						"group w-[30px] h-5 p-0 flex flex-col justify-between items-start cursor-pointer",
						className,
					)}
				>
					<span className="w-full h-[1.2px] bg-[#5a5a5a] hover:w-1/2 transition-all duration-300 ease group-hover:w-1/2"></span>
					<span className="w-1/2 h-[1px] bg-[#5a5a5a] hover:w-full transition-all duration-300 ease group-hover:w-full"></span>
					<span className="w-full h-[1.2px] bg-[#5a5a5a] hover:w-1/2 transition-all duration-300 ease group-hover:w-1/2"></span>
				</Button>
			</DrawerTrigger>
			<DrawerContent className="!max-w-[500px] pl-32 max-sm:pl-14 max-sm:pt-5 gap-y-10 ">
				<DrawerHeader className="!flex flex-row items-center justify-between gap-x-4 mb-[30px]">
					<Logo className="shrink-0" />
					<DrawerClose asChild>
						<Button className="w-4 h-4 p-0 cursor-pointer" variant="ghost">
							<img
								width={24}
								height={24}
								className="object-cover"
								src={closeIcon}
								alt="close"
							/>
						</Button>
					</DrawerClose>
					<DrawerTitle className="hidden"></DrawerTitle>
					<DrawerDescription className="hidden"></DrawerDescription>
				</DrawerHeader>

				<nav>
					<ul className="flex flex-col gap-y-5">
						<li className="hover:text-orange-400 hover:translate-x-2 transition-all duration-300 ease  text-3xl font-bold">
							<Link to={Routes.Catalog}>Каталог</Link>
						</li>
						<li className="hover:text-orange-400 hover:translate-x-2 transition-all duration-300 ease  text-3xl font-bold">
							<Link to={Routes.Catalog}>Товары в наличии</Link>
						</li>
						<li className="hover:text-orange-400 hover:translate-x-2 transition-all duration-300 ease  text-3xl font-bold">
							<Link to={Routes.Catalog}>Скидки</Link>
						</li>
						<li className="hover:text-orange-400 hover:translate-x-2 transition-all duration-300 ease">
							<Link to={Routes.Delivery}>Доставка</Link>
						</li>
						<li className="hover:text-orange-400 hover:translate-x-2 transition-all duration-300 ease">
							<Link to={Routes.Payment}>Оплата</Link>
						</li>
						<li className="hover:text-orange-400 hover:translate-x-2 transition-all duration-300 ease">
							<Link to={Routes.Conditions}>Условия</Link>
						</li>
						<li className="hover:text-orange-400 hover:translate-x-2 transition-all duration-300 ease">
							<Link to={Routes.Contacts}>Контакты</Link>
						</li>
					</ul>
				</nav>
				<HeaderPart />
			</DrawerContent>
		</Drawer>
	);
};
