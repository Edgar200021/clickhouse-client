import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import closeIcon from "@/assets/icons/close.svg";
import searchIcon from "@/assets/icons/search.svg";
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
import { productActions, productSelectors } from "@/store/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
	className?: string;
};

const ClearSearch = ({
	onClick,
	disabled,
}: {
	disabled: boolean;
	onClick: () => void;
}) => {
	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	return (
		<Button
			onClick={() => {
				onClick();
				if (location.pathname === Routes.Catalog) {
					dispatch(productActions.setFiltersSearch(""));
					navigate({
						to: Routes.Catalog,
						search: (prev) => ({ ...prev, search: undefined }),
					});
				}
			}}
			disabled={disabled}
			variant="ghost"
			className="p-0 cursor-pointer"
		>
			<img
				src={closeIcon}
				alt="Close"
				className={cn("opacity-0", {
					"opacity-100": !disabled,
				})}
			/>
		</Button>
	);
};

export const ProductSearch = ({ className }: Props) => {
	const [open, setOpen] = useState(false);
	const search = useAppSelector(productSelectors.getFiltersSearch);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const matches = useMediaQuery("(max-width: 799px)");

	if (matches) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="ghost" className="p-0 cursor-pointer">
						<img src={searchIcon} alt="Search" />
					</Button>
				</DialogTrigger>
				<DialogContent
					showCloseButton={false}
					showOverlay={false}
					className="top-[5%] bg-transparent shadow-none border-none items-start pt-0 p-0"
				>
					<DialogHeader className="!min-f-full !w-full">
						<DialogTitle className="hidden">
							Are you absolutely sure?
						</DialogTitle>
						<DialogDescription className="hidden"></DialogDescription>
					</DialogHeader>
					<Button
						onClick={() => {
							setOpen(false);
						}}
						variant="ghost"
						className="p-0 cursor-pointer justify-self-start"
					>
						<img src={closeIcon} alt="Close" />
					</Button>
					{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
					<label
						onKeyUp={(e) => {
							if (e.key !== "Enter") return;
							setOpen(false);
							navigate({
								to: Routes.Catalog,
								search: (prev) => ({ ...prev, search }),
							});
						}}
						className={cn(
							"flex items-center justify-between !max-w-[650px] rounded-4xl py-2 px-5 focus-within:ring-1 !min-w-full",
							className,
						)}
					>
						<ClearSearch
							onClick={() => dispatch(productActions.setFiltersSearch(""))}
							disabled={!search?.trim().length}
						/>
						<Input
							value={search}
							onChange={(e) =>
								dispatch(productActions.setFiltersSearch(e.target.value))
							}
							placeholder="Что желаете найти?"
							className="placeholder:text-lg placeholder:text-[#7d7d7d] border-none focus:ring-0 focus-visible:ring-0"
						/>
						<Link
							disabled={!search?.trim().length}
							to={Routes.Catalog}
							onClick={() => {
								if (!search?.trim().length) return;
								setOpen(false);
							}}
							search={(prev) => ({
								...prev,
								search,
							})}
						>
							<img src={searchIcon} alt="Search" />
						</Link>
					</label>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<>
			{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
			<label
				onKeyUp={(e) => {
					if (e.key !== "Enter") return;

					navigate({
						to: Routes.Catalog,
						search: (prev) => ({ ...prev, search }),
					});
				}}
				className={cn(
					"flex items-center justify-between max-w-[650px] rounded-4xl py-2 px-5 w-full focus-within:ring-1",
					className,
					2,
				)}
			>
				<ClearSearch
					onClick={() => dispatch(productActions.setFiltersSearch(""))}
					disabled={!search?.trim().length}
				/>
				<Input
					value={search}
					onChange={(e) =>
						dispatch(productActions.setFiltersSearch(e.target.value))
					}
					placeholder="Что желаете найти?"
					className="placeholder:text-lg placeholder:text-[#7d7d7d] border-none focus:ring-0 focus-visible:ring-0"
				/>
				<Link
					disabled={!search?.trim().length}
					to={Routes.Catalog}
					search={(prev) => ({
						...prev,
						search,
					})}
				>
					<img src={searchIcon} alt="Search" />
				</Link>
			</label>
		</>
	);
};
