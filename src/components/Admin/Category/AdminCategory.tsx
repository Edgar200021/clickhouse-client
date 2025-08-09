import { Link } from "@tanstack/react-router";
import penIcon from "@/assets/icons/pen.svg";
import trashIcon from "@/assets/icons/trash.svg";
import cover from "@/assets/images/furniture.jpg";
import { Button } from "@/components/ui/button";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";

type Props = {
	className?: string;
	category: Category;
};

export const AdminCategory = ({ className, category }: Props) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-y-4 rounded-lg border border-gray-200 pb-2 shadow-sm w-[400px]",
				className,
			)}
		>
			<img
				className=" w-full rounded-md object-cover shadow h-[200px] "
				src={category.imageUrl ?? cover}
				alt={category.name}
			/>
			<dl className="flex flex-col gap-y-2 text-sm sm:text-base px-4 mb-2">
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Название:</dt>
					<dd className="text-gray-900 text-right">{category.name}</dd>
				</div>

				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Путь:</dt>
					<dd className="text-gray-900 text-right">{category.path}</dd>
				</div>
			</dl>
			<div className="flex items-center gap-x-2 px-4">
				<Link
					to={Routes.Admin.CategoriesUpdate}
					params={{
						categoryId: String(category.id),
					}}
					className="cursor-pointer w-5 h-5 p-0"
				>
					<img className="w-full" src={penIcon} alt="Edit category" />
				</Link>
				<Button variant="ghost" className="cursor-pointer w-5 h-5 p-0">
					<img className="w-full" src={trashIcon} alt="Delete category" />
				</Button>
			</div>
		</div>
	);
};
