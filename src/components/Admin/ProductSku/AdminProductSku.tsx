import { Link } from "@tanstack/react-router";
import { useState } from "react";
import penIcon from "@/assets/icons/pen.svg";
import trashIcon from "@/assets/icons/trash.svg";
import { Slider } from "@/components/Slider";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Attributes } from "@/const/attributes";
import { Routes } from "@/const/routes";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useDeleteProductSkuMutation } from "@/store/admin/adminApi";
import type { Combined } from "@/types/api";
import { Currency } from "@/types/currency.enum";
import type { ProductAdmin, ProductSkuAdmin } from "@/types/product";

type Props = {
	className?: string;
	productSku: Combined<ProductSkuAdmin, ProductAdmin, "product">;
};

const DeleteProductSku = ({ productSku }: Pick<Props, "productSku">) => {
	const [open, setOpen] = useState(false);
	const [deleteProduct, { isLoading, error }] = useDeleteProductSkuMutation();

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
					<DialogTitle>Удалить вариант продукта?</DialogTitle>
					<DialogDescription>
						Это действие нельзя отменить.Вариант продукт
						<strong className="px-1">{productSku.id}</strong>
						будет удален.
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
							await deleteProduct({ productSkuId: productSku.id }).unwrap();
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

export const AdminProductSku = ({ className, productSku }: Props) => {
	const { product, ...sku } = productSku;

	console.log(productSku);
	return (
		<div
			className={cn(
				"flex flex-col gap-y-4 rounded-lg border border-gray-200 pb-2 shadow-sm w-[400px] overflow-hidden",
				className,
			)}
		>
			{sku.images.length && (
				<Slider
					items={sku.images.map((image) => (
						<img
							key={image.imageId}
							src={image.imageUrl}
							alt={product.name}
							className="object-cover h-[300px] w-full"
						/>
					))}
				/>
			)}

			<dl className="flex flex-col gap-y-2 text-sm sm:text-base px-4 mb-2">
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">ID:</dt>
					<dd className="text-gray-900 text-right">{sku.id}</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Артикул:</dt>
					<dd className="text-gray-900 text-right">{sku.sku}</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Цена:</dt>
					<dd className="text-gray-900 text-right">{sku.price}</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Скидка:</dt>
					<dd className="text-gray-900 text-right">{sku.salePrice ?? "-"}</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Количество:</dt>
					<dd className="text-gray-900 text-right">{sku.quantity}</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Валюта:</dt>
					<dd className="text-gray-900 text-right">{Currency.Rub}</dd>
				</div>

				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Дата создания:</dt>
					<dd className="text-gray-900 text-right">
						{new Date(productSku.createdAt).toISOString()}
					</dd>
				</div>

				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">ID продукта:</dt>
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
						<dt className="font-medium text-gray-600">Инструкция:</dt>
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

				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Характеристики:</dt>
					<dd className="text-gray-900 text-right">
						{Object.entries(productSku.attributes).map(([key, value]) => (
							<div key={key}>
								{Attributes[key as keyof typeof Attributes] ?? key}: {value}
							</div>
						))}
					</dd>
				</div>

				{sku.packages.length > 0 && (
					<div className="px-4">
						<dt className="font-medium text-gray-600">Упаковки:</dt>
						<dd className="text-gray-900 text-right">
							{sku.packages.map((pkg) => (
								<div key={pkg.id} className="mb-2 border p-2 rounded">
									<div>Длина: {pkg.length}</div>
									<div>Ширина: {pkg.width}</div>
									<div>Высота: {pkg.height}</div>
									<div>Вес: {pkg.weight}</div>
									<div>Количество: {pkg.quantity}</div>
								</div>
							))}
						</dd>
					</div>
				)}

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
					title="Обновить вариант продукта"
					to={Routes.Admin.ProductsUpdateSku}
					params={{
						productSkuId: String(sku.id),
					}}
					className="cursor-pointer w-5 h-5 p-0"
				>
					<img className="w-full" src={penIcon} alt="Edit category" />
				</Link>
				<DeleteProductSku productSku={productSku} />
			</div>
		</div>
	);
};
