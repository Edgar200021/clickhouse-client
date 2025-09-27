import { Link } from "@tanstack/react-router";
import { useState } from "react";
import penIcon from "@/assets/icons/pen.svg";
import trashIcon from "@/assets/icons/trash.svg";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Routes } from "@/const/routes";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useDeleteCategoryMutation } from "@/store/admin/adminApi";
import type { Category } from "@/types/category";

type Props = {
	className?: string;
	category: Category;
};

const DeleteCategory = ({ category }: Pick<Props, "category">) => {
	const [open, setOpen] = useState(false);
	const [deleteCategory, { isLoading, error }] = useDeleteCategoryMutation();

	useHandleError(error);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="cursor-pointer w-5 h-5 p-0">
					<img className="w-full" src={trashIcon} alt="Удалить категорию" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Удалить категорию?</DialogTitle>
					<DialogDescription>
						Это действие нельзя отменить. Категория
						<strong className="px-1"> {category.name}</strong> будет удалена без
						возможности восстановления.
					</DialogDescription>
				</DialogHeader>
				<div className="flex justify-end gap-x-2 mt-4">
					<Button
						variant="outline"
						onClick={() => {
							setOpen(false);
						}}
						className="cursor-pointer"
					>
						Отмена
					</Button>
					<Button
						variant="destructive"
						onClick={async () => {
							await deleteCategory({ categoryId: category.id }).unwrap();
							setOpen(false);
						}}
						disabled={isLoading}
						className="cursor-pointer"
					>
						Удалить
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export const AdminCategory = ({ className, category }: Props) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-y-4 rounded-lg border border-gray-200 pb-2 shadow-sm w-[400px]",
				className,
			)}
		>
			{category.imageUrl && (
				<img
					className=" w-full rounded-md object-cover shadow h-[200px] "
					src={category.imageUrl}
					alt={category.name}
				/>
			)}

			<dl
				className={cn("flex flex-col gap-y-2 text-sm sm:text-base px-4 mb-2", {
					"pt-4": !category.imageUrl,
				})}
			>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">ID:</dt>
					<dd className="text-gray-900 text-right">{category.id}</dd>
				</div>
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
				<DeleteCategory category={category} />
			</div>
		</div>
	);
};
