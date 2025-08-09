import { Link } from "@tanstack/react-router";
import arrowIcon from "@/assets/icons/arrow.svg";
import ecommerceIcon from "@/assets/icons/ecommerce.svg";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Logo } from "../ui/Logo";

type Props = {
	className?: string;
};
export const Navbar = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-y-12 w-[240px] text-[#3a3541] bg-white p-10",
				className,
			)}
		>
			<Logo to={Routes.Admin.Base} />
			<ul className="flex flex-col gap-y-10 w-full">
				<li>
					<Collapsible>
						<CollapsibleTrigger asChild>
							<Button
								variant="ghost"
								className={cn(
									"cursor-pointer group data-[state=open]:bg-orange-200 data-[state=open]:text-orange-500 rounded-[8px] px-2 py-3 flex gap-x-2 hover:bg-orange-200 hover:text-orange-500 w-full justify-start text-lg",
								)}
							>
								{/*<svg width={24} height={24}>
									<use xlinkHref={`${sprites}#ecommerce`} />
								</svg>*/}
								<img
									width={16}
									height={16}
									src={ecommerceIcon}
									alt="ecommerce"
								/>
								<span>E-commerce</span>
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
								<li className="w-full">
									<Collapsible>
										<CollapsibleTrigger asChild>
											<Button
												variant="ghost"
												className={cn(
													"cursor-pointer group !hover:bg-transparent !bg-none  data-[state=open]:text-orange-500 rounded-[8px]  flex gap-x-2  hover:text-orange-500 w-full hover:!bg-transparent justify-between py-0 pl-0 pr-2 text-shadow-lg text-lg",
												)}
											>
												<span>Категории</span>
												<img
													className="transition-transform duration-300 ease group-data-[state=open]:-rotate-180"
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
											<ul className="flex flex-col gap-y-2 pl-5 pt-2">
												<li>
													<Link
														className="hover:text-orange-500 transition-colors duration-300 ease [&.active]:text-orange-500 text-lg"
														activeOptions={{
															exact: true,
														}}
														to={Routes.Admin.Categories}
													>
														Список категорий
													</Link>
												</li>
												<li>
													<Link
														className="hover:text-orange-500 transition-colors duration-300 ease [&.active]:text-orange-500 text-lg"
														activeOptions={{
															exact: true,
														}}
														to={Routes.Admin.CategoriesCreate}
													>
														Создать категорию
													</Link>
												</li>

												<li>
													<Link
														className="hover:text-orange-500 transition-colors duration-300 ease [&.active]:text-orange-500 text-lg"
														activeOptions={{
															exact: true,
														}}
														to={Routes.Admin.CategoriesUpdate}
													>
														Обновить категорию
													</Link>
												</li>
											</ul>
										</CollapsibleContent>
									</Collapsible>
								</li>

								<li className="w-full">
									<Collapsible>
										<CollapsibleTrigger asChild>
											<Button
												variant="ghost"
												className={cn(
													"cursor-pointer group !hover:bg-transparent !bg-none  data-[state=open]:text-orange-500 rounded-[8px] flex gap-x-2  hover:text-orange-500 w-full hover:!bg-transparent justify-between py-0 pl-0 pr-2 text-lg",
												)}
											>
												<span>Продукты</span>
												<img
													className="transition-transform duration-300 ease group-data-[state=open]:-rotate-180"
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
											<ul className="flex flex-col gap-y-2 pl-5 pt-2">
												<li>
													<Link
														className="hover:text-orange-500 transition-colors duration-300 ease [&.active]:text-orange-500 text-lg"
														activeOptions={{
															exact: true,
														}}
														to={Routes.Admin.Products}
													>
														Список продуктов
													</Link>
												</li>
												<li>
													<Link
														className="hover:text-orange-500 transition-colors duration-300 ease [&.active]:text-orange-500 text-lg"
														activeOptions={{
															exact: true,
														}}
														to={Routes.Admin.ProductsCreate}
													>
														Создать продукт
													</Link>
												</li>

												<li>
													<Link
														className="hover:text-orange-500 transition-colors duration-300 ease [&.active]:text-orange-500 text-lg"
														activeOptions={{
															exact: true,
														}}
														to={Routes.Admin.ProductsUpdate}
													>
														Обновить продукт
													</Link>
												</li>
											</ul>
										</CollapsibleContent>
									</Collapsible>
								</li>

								<li className="w-full">
									<Collapsible>
										<CollapsibleTrigger asChild>
											<Button
												variant="ghost"
												className={cn(
													"cursor-pointer group !hover:bg-transparent !bg-none  data-[state=open]:text-orange-500 rounded-[8px] flex gap-x-2  hover:text-orange-500 w-full hover:!bg-transparent justify-between py-0 pl-0 pr-2 text-lg",
												)}
											>
												<span>Пользователи</span>
												<img
													className="transition-transform duration-300 ease group-data-[state=open]:-rotate-180"
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
											<ul className="flex flex-col gap-y-2 pl-5 pt-2">
												<li>
													<Link
														className="hover:text-orange-500 transition-colors duration-300 ease [&.active]:text-orange-500 text-lg"
														activeOptions={{
															exact: true,
														}}
														to={Routes.Admin.Categories}
													>
														Список категорий
													</Link>
												</li>
												<li>
													<Link
														className="hover:text-orange-500 transition-colors duration-300 ease [&.active]:text-orange-500 text-lg"
														activeOptions={{
															exact: true,
														}}
														to={Routes.Admin.CategoriesCreate}
													>
														Создать категорию
													</Link>
												</li>

												<li>
													<Link
														className="hover:text-orange-500 transition-colors duration-300 ease [&.active]:text-orange-500 text-lg"
														activeOptions={{
															exact: true,
														}}
														to={Routes.Admin.CategoriesUpdate}
													>
														Обновить категорию
													</Link>
												</li>
											</ul>
										</CollapsibleContent>
									</Collapsible>
								</li>
							</ul>
						</CollapsibleContent>
					</Collapsible>
				</li>
			</ul>
		</div>
	);
};
