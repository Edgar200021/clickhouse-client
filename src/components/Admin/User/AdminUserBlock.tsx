import { useState } from "react";
import toast from "react-hot-toast";
import lock from "@/assets/icons/lock.svg";
import unlock from "@/assets/icons/unlock.svg";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useHandleError } from "@/hooks/useHandleError";
import { useBlockToggleMutation } from "@/store/admin/adminApi";
import type { AdminUser } from "@/types/user";

type Props = {
	user: AdminUser;
};

export const AdminUserBlock = ({ user }: Props) => {
	const [open, setOpen] = useState(false);
	const [blockToggle, { isLoading, error }] = useBlockToggleMutation();
	useHandleError(error);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="p-0 cursor-pointer w-5">
					<img
						src={user.isBanned ? unlock : lock}
						alt={user.isBanned ? "Разбанить" : "Банить"}
					/>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{user.isBanned ? "Разбанить" : "Забанить"} пользователя?
					</DialogTitle>
					<DialogDescription>
						{user.isBanned
							? "Пользователь будет разблокирован и сможет снова заходить в систему."
							: "Пользователь будет заблокирован и не сможет входить в систему до разблокировки."}
						1
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
							await blockToggle({
								userId: user.id,
								type: user.isBanned ? "unlock" : "lock",
							}).unwrap();
							toast.success(
								`Пользователь успешно ${user.isBanned ? "разблакирован" : "заблакирован"}`,
							);
							setOpen(false);
						}}
						disabled={isLoading}
						className="cursor-pointer"
					>
						{user.isBanned ? "Разбанить" : "Забанить"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
