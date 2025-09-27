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
import { useDeletePromocodeMutation } from "@/store/admin/adminApi";
import { adminActions } from "@/store/admin/adminSlice";
import { useAppDispatch } from "@/store/store";
import type { PromocodeAdmin } from "@/types/promocode";

type Props = {
	className?: string;
	promocode: PromocodeAdmin;
};

const DeletePromocode = ({ promocode }: Pick<Props, "promocode">) => {
	const [open, setOpen] = useState(false);
	const [deletePromocode, { isLoading, error }] = useDeletePromocodeMutation();

	useHandleError(error);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="cursor-pointer w-5 h-5 p-0">
					<img className="w-full" src={trashIcon} alt="Удалить промокод" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Удалить промокод?</DialogTitle>
					<DialogDescription>
						Это действие нельзя отменить. Промокод
						<strong className="px-1"> {promocode.code}</strong> будет удалена
						без возможности восстановления.
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
							await deletePromocode({ promocodeId: promocode.id }).unwrap();
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

export const AdminPromocode = ({ className, promocode }: Props) => {
	const dispatch = useAppDispatch();
	return (
		<div
			className={cn(
				"flex flex-col gap-y-4 rounded-lg border border-gray-200 pb-2 shadow-sm w-[400px]",
				className,
			)}
		>
			<dl className="flex flex-col gap-y-2 text-sm sm:text-base px-4 py-4">
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">ID:</dt>
					<dd className="text-gray-900 text-right">{promocode.id}</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Код:</dt>
					<dd className="text-gray-900 text-right">{promocode.code}</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Тип:</dt>
					<dd className="text-gray-900 text-right">{promocode.type}</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Скидка:</dt>
					<dd className="text-gray-900 text-right">
						{promocode.discountValue}
					</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Использовано:</dt>
					<dd className="text-gray-900 text-right">
						{promocode.usageCount} / {promocode.usageLimit}
					</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Дата начала:</dt>
					<dd className="text-gray-900 text-right">
						{new Date(promocode.validFrom).toLocaleDateString()}
					</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Дата окончания:</dt>
					<dd className="text-gray-900 text-right">
						{new Date(promocode.validTo).toLocaleDateString()}
					</dd>
				</div>
			</dl>

			<div className="flex items-center gap-x-2 px-4">
				<Link
					onClick={() => dispatch(adminActions.setPromocode(promocode))}
					to={Routes.Admin.PromocodeUpdate}
					params={{
						promocodeId: String(promocode.id),
					}}
					className="cursor-pointer w-5 h-5 p-0"
				>
					<img className="w-full" src={penIcon} alt="Редактировать промокод" />
				</Link>

				<DeletePromocode promocode={promocode} />
			</div>
		</div>
	);
};
