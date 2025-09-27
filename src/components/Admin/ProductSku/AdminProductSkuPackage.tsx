import { Button } from "@/components/ui/button";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useDeleteProductSkuPackageMutation } from "@/store/admin/adminApi";
import type {
	ProductSkuAdmin,
	ProductSkuPackage,
	ProductSkuPackageAdmin,
} from "@/types/product";

type Props = {
	className?: string;
	package:
		| {
				type: "regular";
				package: ProductSkuPackage;
				onDelete: () => void;
		  }
		| {
				type: "admin";
				productSkuId: ProductSkuAdmin["id"];
				package: ProductSkuPackageAdmin;
		  };
};

export const AdminProductSkuPackage = ({ className, package: pkg }: Props) => {
	const [deletePackage, { isLoading, error }] =
		useDeleteProductSkuPackageMutation();
	useHandleError(error);

	return (
		<div
			className={cn(
				"rounded-xl border border-gray-200 bg-white p-4 shadow-sm relative",
				{
					"opacity-70": isLoading,
				},
				className,
			)}
		>
			<Button
				variant="ghost"
				size="icon"
				type="button"
				onClick={
					pkg.type === "regular"
						? () => pkg.onDelete()
						: () =>
								deletePackage({
									productSkuId: pkg.productSkuId,
									packageId: pkg.package.id,
								})
				}
				className="cursor-pointer p-0 absolute right-2 top-2 w-fit h-fit"
			>
				&#x2715;
			</Button>
			<h3 className="text-lg font-semibold text-gray-800 mb-4">📦 Упаковка</h3>

			<div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
				<div className="flex flex-col">
					<span className="text-gray-500 text-xs">Длина</span>
					<span className="text-gray-900 font-medium">
						{pkg.package.length} см
					</span>
				</div>
				<div className="flex flex-col">
					<span className="text-gray-500 text-xs">Высота</span>
					<span className="text-gray-900 font-medium">
						{pkg.package.height} см
					</span>
				</div>
				<div className="flex flex-col">
					<span className="text-gray-500 text-xs">Ширина</span>
					<span className="text-gray-900 font-medium">
						{pkg.package.width} см
					</span>
				</div>
				<div className="flex flex-col">
					<span className="text-gray-500 text-xs">Вес</span>
					<span className="text-gray-900 font-medium">
						{pkg.package.weight} кг
					</span>
				</div>
				<div className="flex flex-col">
					<span className="text-gray-500 text-xs">Количество</span>
					<span className="text-gray-900 font-medium">
						{pkg.package.quantity}
					</span>
				</div>

				{pkg.type === "admin" && (
					<>
						<div className="flex flex-col">
							<span className="text-gray-500 text-xs">ID</span>
							<span className="text-gray-900 font-medium">
								{pkg.package.id}
							</span>
						</div>
						<div className="flex flex-col">
							<span className="text-gray-500 text-xs">Создано</span>
							<span className="text-gray-900 font-medium">
								{new Date(pkg.package.createdAt).toLocaleString()}
							</span>
						</div>
						<div className="flex flex-col">
							<span className="text-gray-500 text-xs">Обновлено</span>
							<span className="text-gray-900 font-medium">
								{new Date(pkg.package.updatedAt).toLocaleString()}
							</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
