import { Link } from "@tanstack/react-router";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import { Menu } from "../Menu";
import { ProductSearch } from "../Product/ProductSearch";
import { Logo } from "../ui/Logo";
import { HeaderPart } from "./HeaderPart";

type Props = {
	className?: string;
};

export const Header = ({ className }: Props) => {
	return (
		<header className={cn("flex flex-col gap-y-12 py-6", className)}>
			<div className={"flex items-center justify-between gap-x-5 "}>
				<Menu className="min-[800px]:hidden" />
				<Logo className="max-[800px]:self-center max-[800px]:justify-self-center" />
				<ProductSearch className="min-[800px]:hidden" />
				<nav className="max-[800px]:hidden">
					<ul className="flex items-center gap-x-4">
						<li>
							<Link
								className="text-base hover:text-orange-400 transition-colors duration-300 ease"
								to={Routes.Catalog}
							>
								Каталог
							</Link>
						</li>
						<li>
							<Link
								className="text-base hover:text-orange-400 transition-colors duration-300 ease"
								to={Routes.Delivery}
							>
								Доставка
							</Link>
						</li>

						<li>
							<Link
								className="text-base hover:text-orange-400 transition-colors duration-300 ease"
								to={Routes.Payment}
							>
								Оплата
							</Link>
						</li>
						<li>
							<Link
								className="text-base hover:text-orange-400 transition-colors duration-300 ease"
								to={Routes.Conditions}
							>
								Условия
							</Link>
						</li>
						<li>
							<Link
								className="text-base hover:text-orange-400 transition-colors duration-300 ease"
								to={Routes.Contacts}
							>
								Контакты
							</Link>
						</li>
					</ul>
				</nav>

				<div className="flex flex-col gap-y-2 max-[800px]:hidden">
					<a href="tel:3757364636472" className="text-base">
						+ 375 736 463 64 72
					</a>
					<Link
						className="text-sm text-[#7d7d7d] self-end hover:text-orange-400 transition-colors duration-300 ease"
						to={Routes.Main}
					>
						Заказать звонок
					</Link>
				</div>
			</div>
			<div className="flex items-center justify-between gap-x-6 max-[800px]:hidden">
				<div className="flex items-center gap-x-22 w-2/3">
					<Menu />
					<ProductSearch />
				</div>
				<HeaderPart className="ml-auto" />
			</div>
		</header>
	);
};
