import { type ComponentProps, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import closeIcon from "@/assets/icons/close.svg";
import searchIcon from "@/assets/icons/search.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { adminActions, adminSelectors } from "@/store/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

type Props = {
	className?: string;
	type: Extract<
		keyof typeof adminSelectors,
		| "getUsersFiltersSearch"
		| "getProductFiltersSearch"
		| "getProductsSkusFiltersSearch"
		| "getPromocodesFiltersSearch"
		| "getAdminOrdersFiltersSearch"
	>;
} & ComponentProps<"input">;

export const AdminSearch = ({ className, type, ...rest }: Props) => {
	const userSearch = useAppSelector(adminSelectors[type]) as string;
	const dispatch = useAppDispatch();
	const [search, setSearch] = useState("");
	const debounced = useDebounceValue(search, 500);

	useEffect(() => {
		if (!userSearch?.trim() && !debounced[0]) return;
		const value = !debounced[0].trim() ? undefined : debounced[0];

		let fn: (typeof adminActions)[
			| "setUsersFilters"
			| "setProductFilters"
			| "setProductsSkusFilters"
			| "setPromocodesFilters"
			| "setOrdersFilters"];

		switch (type) {
			case "getUsersFiltersSearch":
				fn = adminActions.setUsersFilters;
				break;
			case "getProductFiltersSearch":
				fn = adminActions.setProductFilters;
				break;
			case "getProductsSkusFiltersSearch":
				fn = adminActions.setProductsSkusFilters;
				break;
			case "getPromocodesFiltersSearch":
				fn = adminActions.setPromocodesFilters;
				break;
			case "getAdminOrdersFiltersSearch":
				fn = adminActions.setOrdersFilters;
				break;
			default: {
				const x: never = type;
				return x;
			}
		}

		console.log(fn);

		dispatch(fn!({ key: "search", val: value }));
	}, [type, userSearch, debounced]);

	return (
		<>
			{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
			<label
				className={cn(
					"flex items-center justify-between max-w-[650px] rounded-4xl py-2 px-5 w-full focus-within:ring-1",
					className,
					2,
				)}
			>
				<Button
					onClick={() => setSearch("")}
					variant="ghost"
					className="p-0 cursor-pointer hover:bg-transparent"
				>
					<img
						src={closeIcon}
						alt="Close"
						className={cn("opacity-0", {
							"opacity-100": !!search.trim(),
						})}
					/>
				</Button>
				<Input
					{...rest}
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="placeholder:text-lg placeholder:text-[#7d7d7d] border-none focus:ring-0 focus-visible:ring-0  !shadow-none"
				/>

				<img src={searchIcon} alt="Search" />
			</label>
		</>
	);
};
