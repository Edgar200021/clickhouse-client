import { useEffect } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { Spinner } from "@/components/ui/Spinner";
import { useHandleError } from "@/hooks/useHandleError";
import { getUsersSchema } from "@/schemas/api/user/getUsers.schema";
import { useLazyGetUsersQuery } from "@/store/admin/adminApi";
import { adminSelectors } from "@/store/admin/adminSlice";
import { useAppSelector } from "@/store/store";
import { AdminUser } from "./AdminUser";

export const AdminUserList = () => {
	const usersFilters = useAppSelector(adminSelectors.getUsersFilters);
	const [getUsers, { data, error, isLoading, isFetching }] =
		useLazyGetUsersQuery();

	useHandleError(error);

	useEffect(() => {
		(async () => {
			const { data, error } = await getUsersSchema.safeParseAsync(usersFilters);
			if (error) {
				for (const err of z.treeifyError(error).errors) {
					toast.error(err, {
						duration: 2000,
					});
				}
				return;
			}

			getUsers(data);
		})();
	}, [usersFilters]);

	if (isLoading)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (!data) return null;

	return (
		<ul className="flex flex-wrap gap-10">
			{data.data.users.map((user) => {
				return (
					<li className={isFetching ? "opacity-70" : ""} key={user.id}>
						<AdminUser user={user} />
					</li>
				);
			})}
		</ul>
	);
};
