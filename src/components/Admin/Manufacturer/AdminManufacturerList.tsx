import { useEffect } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { useHandleError } from "@/hooks/useHandleError";
import { useLazyGetManufacturersQuery } from "@/store/admin/adminApi";
import { adminSelectors } from "@/store/admin/adminSlice";
import { useAppSelector } from "@/store/store";
import { AdminManufacturer } from "./AdminManufacturer";

export const AdminManufacturerList = () => {
	const manufacturers = useAppSelector(adminSelectors.getManufactories);
	const [getManufacturers, { error, isLoading }] =
		useLazyGetManufacturersQuery();

	useHandleError(error);

	useEffect(() => {
		if (manufacturers) return;

		getManufacturers(null);
	}, [manufacturers]);

	if (isLoading)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (!manufacturers) return null;

	return (
		<ul className="flex flex-wrap gap-10">
			{manufacturers.map((val) => {
				return (
					<li key={val.id}>
						<AdminManufacturer manufacturer={val} />
					</li>
				);
			})}
		</ul>
	);
};
