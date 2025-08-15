import { Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import arrowIcon from "@/assets/icons/arrow.svg";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import { categorySelectors } from "@/store/category/categorySlice";
import { useAppSelector } from "@/store/store";
import type { Category } from "@/types/category";

type Props = { className?: string; category: Category };

export const CategoryBreadcrumbs = ({ className, category }: Props) => {
	const groupedCategories = useAppSelector(
		categorySelectors.getGroupedCategories,
	);

	const breadCrumbs = groupedCategories[
		category.path.includes(".")
			? category.path.slice(0, category.path.indexOf("."))
			: category.path
	].filter((val) => category.path.includes(val.path));

	return (
		<>
			<div className={cn("flex items-center gap-x-2 pb-3", className)}>
				{breadCrumbs.map((v, i) => (
					<Fragment key={v.id}>
						{v.path === category.path ? (
							<span className="text-[#7d7d7d] text-sm">{v.name}</span>
						) : (
							<Link
								className="text-[#7d7d7d] text-sm"
								to={Routes.SpecificCatalog}
								params={{
									catalogPath: v.path,
								}}
							>
								{v.name}
							</Link>
						)}
						{breadCrumbs.length !== 1 && i !== breadCrumbs.length - 1 && (
							<img
								className="w-2 h-2 -rotate-90 mt-[1px]"
								src={arrowIcon}
								alt="arrow"
							></img>
						)}
					</Fragment>
				))}
			</div>
			<hr className="h-[1px] border-0 border-b-[1px] border-[#e9e5e5] w-full" />
		</>
	);
};
