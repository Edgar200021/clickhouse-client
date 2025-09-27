import { cn } from "@/lib/utils";
import type { AdminUser as TAdminUser } from "@/types/user";
import { AdminUserBlock } from "./AdminUserBlock";

type Props = {
	className?: string;
	user: TAdminUser;
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

				<div className="flex justify-between gap-x-4 items-center">
					<dt className="font-medium text-gray-600">Статус пользователя:</dt>
					<dd className="text-right">
						{user.isBanned ? (
							<span className="inline-block px-2 py-1 text-red-700 bg-red-100 rounded-full text-sm font-semibold">
								Заблокирован
							</span>
						) : (
							<span className="inline-block px-2 py-1 text-green-700 bg-green-100 rounded-full text-sm font-semibold">
								Активен
							</span>
						)}
					</dd>
				</div>
			</dl>
			<AdminUserBlock user={user} />
		</div>
	);
};
