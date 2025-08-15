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
import type { AdminUser as TAdminUser } from "@/types/user";
import { AdminUserBlock } from "./AdminUserBlock";

type Props = {
	className?: string;
	user: TAdminUser;
};

const DeleteManufacturer = ({ user }: Pick<Props, "user">) => {
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
					<DialogTitle>Заблакировать пользователя?</DialogTitle>
					<DialogDescription>
						{/*Это действие нельзя отменить. Производитель
						<strong> {manufacturer.name}</strong> будет удалена без возможности
						восстановления.*/}
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
							// await deleteManufacturer({
							// 	manufacturerId: manufacturer.id,
							// }).unwrap();
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

export const AdminUser = ({ className, user }: Props) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-y-4 rounded-lg border border-gray-200 p-4 shadow-sm w-[400px]",
				className,
			)}
		>
			<dl className={"flex flex-col gap-y-2 text-sm sm:text-base  mb-2"}>
				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">ID:</dt>
					<dd className="text-gray-900 text-right">{user.id}</dd>
				</div>

				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Эл. почта:</dt>
					<dd className="text-gray-900 text-right">{user.email}</dd>
				</div>

				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Привязанные аккаунты:</dt>
					<dd className="text-gray-900 text-right">
						{user.googleId ? "Google ✓" : "Google ✗"}
						<br />
						{user.facebookId ? "Facebook ✓" : "Facebook ✗"}
					</dd>
				</div>

				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Верифицирован:</dt>
					<dd className="text-gray-900 text-right">
						{user.isVerified ? "Да" : "Нет"}
					</dd>
				</div>

				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Заблакирован:</dt>
					<dd className="text-gray-900 text-right">
						{user.isBanned ? "Да" : "Нет"}
					</dd>
				</div>

				<div className="flex justify-between gap-x-4">
					<dt className="font-medium text-gray-600">Дата создания аккаунта:</dt>
					<dd className="text-gray-900 text-right">
						{(() => {
							const d = new Date(user.createdAt);
							const date = [d.getDate(), d.getMonth() + 1, d.getFullYear()]
								.map((n) => String(n).padStart(2, "0"))
								.join(".");
							const time = [d.getHours(), d.getMinutes()]
								.map((n) => String(n).padStart(2, "0"))
								.join(":");
							return `${date} ${time}`;
						})()}
					</dd>
				</div>
			</dl>
			<AdminUserBlock user={user} />
		</div>
	);
};
