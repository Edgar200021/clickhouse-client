import { useEffect } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useLazyGetManufacturersQuery } from "@/store/admin/adminApi";
import { adminSelectors } from "@/store/admin/adminSlice";
import { useAppSelector } from "@/store/store";
import { AdminManufacturer } from "./AdminManufacturer";

type Props = {
	className?: string;
	hidden?: boolean;
};

export const AdminManufacturerList = ({ className, hidden = false }: Props) => {
	const manufacturers = useAppSelector(adminSelectors.getManufactories);
	const [getManufacturers, { error, isLoading }] =
		useLazyGetManufacturersQuery();

	useHandleError(error);

	useEffect(() => {
		if (manufacturers) return;

		getManufacturers(null);
	}, [manufacturers]);

	if (!hidden && isLoading)
		return (
			<div className="flex items-center justify-center h-screen -mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (hidden || !manufacturers) return null;

	return (
		<ul className={cn("flex flex-wrap gap-10", className)}>
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
