import { cn } from "@/lib/utils";
import type {
	ProductSkuAdmin,
	ProductSkuPackage,
	ProductSkuPackageAdmin,
} from "@/types/product";
import { AdminProductSkuPackage } from "./AdminProductSkuPackage";

type Props = {
	className?: string;
	packages: (
		| {
				package: ProductSkuPackage;
				onDelete: () => void;
		  }
		| { productSkuId: ProductSkuAdmin["id"]; package: ProductSkuPackageAdmin }
	)[];
};

export const AdminProductSkuPackageList = ({ className, packages }: Props) => {
	return (
		<ul className={cn("flex gap-4 flex-wrap", className)}>
			{packages
				.sort((a, b) => {
					const aHasDelete = "onDelete" in a ? 1 : 0;
					const bHasDelete = "onDelete" in b ? 1 : 0;
					return aHasDelete - bHasDelete;
				})
				.map((pkg) => (
					<li
						key={
							pkg.package.height +
							pkg.package.length +
							pkg.package.quantity +
							pkg.package.weight +
							pkg.package.width
						}
					>
						<AdminProductSkuPackage
							package={
								"onDelete" in pkg
									? {
											type: "regular",
											package: pkg.package,
											onDelete: pkg.onDelete,
										}
									: {
											type: "admin",
											productSkuId: pkg.productSkuId,
											package: pkg.package,
										}
							}
						/>
					</li>
				))}
		</ul>
	);
};
