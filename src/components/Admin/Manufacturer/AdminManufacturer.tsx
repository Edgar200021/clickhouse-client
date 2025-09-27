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
import { cn } from "@/lib/utils";
import { useDeleteManufacturerMutation } from "@/store/admin/adminApi";
import type { Manufacturer } from "@/types/manufacturer";

type Props = {
	className?: string;
	manufacturer: Manufacturer;
};

const DeleteManufacturer = ({ manufacturer }: Pick<Props, "manufacturer">) => {
	const [open, setOpen] = useState(false);
	const [deleteManufacturer, { isLoading }] = useDeleteManufacturerMutation();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="cursor-pointer w-5 h-5 p-0">
					<img className="w-full" src={trashIcon} alt="Удалить производителя" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Удалить производителя?</DialogTitle>
					<DialogDescription>
						Это действие нельзя отменить. Производитель
						<strong className="px-1">{manufacturer.name}</strong> будет удалена
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
							await deleteManufacturer({
								manufacturerId: manufacturer.id,
							}).unwrap();
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

export const AdminManufacturer = ({ className, manufacturer }: Props) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-y-4 rounded-lg border border-gray-200 py-4 shadow-sm w-[400px]",
				className,
			)}
		>
			<dl className={"flex flex-col gap-y-2 text-sm sm:text-base px-4 mb-2"}>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">ID:</dt>
					<dd className="text-gray-900 text-right">{manufacturer.id}</dd>
				</div>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Название:</dt>
					<dd className="text-gray-900 text-right">{manufacturer.name}</dd>
				</div>
			</dl>
			<div className="flex items-center gap-x-2 px-4">
				<Link
					to={Routes.Admin.ManufacturersUpdate}
					params={{
						manufacturerId: String(manufacturer.id),
					}}
					className="cursor-pointer w-5 h-5 p-0"
				>
					<img className="w-full" src={penIcon} alt="Edit manufacturer" />
				</Link>
				{manufacturer.id !== 1 && (
					<DeleteManufacturer manufacturer={manufacturer} />
				)}
			</div>
		</div>
	);
};
