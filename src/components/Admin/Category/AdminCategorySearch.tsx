import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import closeIcon from "@/assets/icons/close.svg";
import searchIcon from "@/assets/icons/search.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
	categoryActions,
	categorySelectors,
} from "@/store/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

type Props = {
	className?: string;
};

export const AdminCategorySearch = ({ className }: Props) => {
	const categorySearch = useAppSelector(categorySelectors.getSearch);
	const dispatch = useAppDispatch();
	const [search, setSearch] = useState("");
	const debounced = useDebounceValue(search, 500);

	useEffect(() => {
		if (!categorySearch.trim() && !debounced) return;

		dispatch(categoryActions.setSearch(debounced[0]));
	}, [debounced]);

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
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Введите название или путь категории"
					className="placeholder:text-lg placeholder:text-[#7d7d7d] border-none focus:ring-0 focus-visible:ring-0 !bg-none "
				/>

				<img src={searchIcon} alt="Search" />
			</label>
		</>
	);
};
