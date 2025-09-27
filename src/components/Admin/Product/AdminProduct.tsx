import { Link } from "@tanstack/react-router";
import { useState } from "react";
import addIcon from "@/assets/icons/add.svg";
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
import { useDeleteProductMutation } from "@/store/admin/adminApi";
import type { ProductAdmin } from "@/types/product";

type Props = {
	className?: string;
	product: ProductAdmin;
};

const DeleteProduct = ({ product }: Pick<Props, "product">) => {
	const [open, setOpen] = useState(false);
	const [deleteProduct, { isLoading, error }] = useDeleteProductMutation();

	useHandleError(error);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					title="Удалить продукт"
					variant="ghost"
					className="cursor-pointer w-5 h-5 p-0"
				>
					<img className="w-full" src={trashIcon} alt="Удалить категорию" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Удалить категорию?</DialogTitle>
					<DialogDescription>
						Это действие нельзя отменить. Продукт
						<strong className="px-1">{product.name}</strong>
						будет скрыт из пользовательского интерфейса и помечен как удалённый.
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
							await deleteProduct({ productId: product.id }).unwrap();
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

export const AdminProduct = ({ className, product }: Props) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-y-4 rounded-lg border border-gray-200 py-2 shadow-sm w-[400px]",
				className,
			)}
		>
			<dl className="flex flex-col gap-y-2 text-sm sm:text-base px-4 mb-2">
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">ID:</dt>
					<dd className="text-gray-900 text-right">{product.id}</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Название:</dt>
					<dd className="text-gray-900 text-right">{product.name}</dd>
				</div>

				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Описание:</dt>
					<dd className="text-gray-900 text-right">{product.description}</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Короткое описание:</dt>
					<dd className="text-gray-900 text-right">
						{product.shortDescription}
					</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Материал и уход:</dt>
					<dd className="text-gray-900 text-right">
						{product.materialsAndCare}
					</dd>
				</div>

				{product.assemblyInstructionFileUrl && (
					<div className="flex justify-between gap-x-4">
						<dt className="font-medium text-gray-600">Ссылка на инструкцию:</dt>
						<dd className="text-gray-900 text-right">
							{product.assemblyInstructionFileUrl}
						</dd>
					</div>
				)}
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">ID категории:</dt>
					<dd className="text-gray-900 text-right">{product.categoryId}</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">ID производителя:</dt>
					<dd className="text-gray-900 text-right">{product.manufacturerId}</dd>
				</div>
				<div className="flex justify-between gap-x-4 items-center">
					<dt className="font-medium text-gray-600">Статус:</dt>
					<dd className="text-right">
						{product.isDeleted ? (
							<span className="inline-block px-2 py-1 text-red-700 bg-red-100 rounded-full text-sm font-semibold">
								Удалён
							</span>
						) : (
							<span className="inline-block px-2 py-1 text-green-700 bg-green-100 rounded-full text-sm font-semibold">
								Активен
							</span>
						)}
					</dd>
				</div>
			</dl>
			<div className="flex items-center gap-x-2 px-4">
				<Link
					title="Создать вариант продукта"
					to={Routes.Admin.ProductsCreateSku}
					params={{
						productId: String(product.id),
					}}
					className="cursor-pointer w-5 h-5 p-0"
				>
					<img className="w-full" src={addIcon} alt="Edit category" />
				</Link>
				<Link
					title="Обновить продукт"
					to={Routes.Admin.ProductsUpdate}
					params={{
						productId: String(product.id),
					}}
					className="cursor-pointer w-5 h-5 p-0"
				>
					<img className="w-full" src={penIcon} alt="Edit category" />
				</Link>
				<DeleteProduct product={product} />
			</div>
		</div>
	);
};
