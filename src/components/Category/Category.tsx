import { Link } from "@tanstack/react-router";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import type { Category as TCategory } from "@/types/category";

type Props = {
	className?: string;
	category: TCategory;
};

export const Category = ({ className, category }: Props) => {
	return (
		<div
			className={cn(
				"flex flex-col items-center gap-y-5 max-w-[300px] w-full cursor-pointer relative",
				className,
			)}
		>
			<Link
				className="absolute w-full h-full left-0 top-0"
				to={Routes.SpecificCatalog}
				params={{
					catalogPath: category.path,
				}}
			/>
			{category.imageUrl && (
				<img
					className="w-full h-[180px] rounded-md "
					src={category.imageUrl}
					alt={category.name}
				/>
			)}
			<span className="text-lg">{category.name}</span>
		</div>
	);
};
