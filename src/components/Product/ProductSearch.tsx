import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import closeIcon from "@/assets/icons/close.svg";
import searchIcon from "@/assets/icons/search.svg";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/auth/forgot-password";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
	className?: string;
};

export const ProductSearch = ({ className }: Props) => {
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	return (
		<label
			onKeyUp={(e) => {
				console.log("EE", e);
				if (e.key !== "Enter") return;
				navigate({
					to: Routes.Catalog,
					search: { name: search },
				});
			}}
			className={cn(
				"flex items-center justify-between max-w-[650px] rounded-4xl py-2 px-5 w-full focus-within:ring-1",
				className,
				2,
			)}
		>
			<Button
				onClick={() => setSearch("")}
				disabled={!search.trim().length}
				variant="ghost"
				className="p-0 cursor-pointer"
			>
				<img
					src={closeIcon}
					alt="Close"
					className={cn("opacity-0", { "opacity-100": !!search.trim().length })}
				/>
			</Button>
			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Что желаете найти?"
				className="placeholder:text-lg placeholder:text-[#7d7d7d] border-none focus:ring-0 focus-visible:ring-0"
			/>
			<Link
				disabled={!search.trim().length}
				to={Routes.Catalog}
				search={(prev) => ({
					...prev,
					name: search,
				})}
			>
				<img src={searchIcon} alt="Search" />
			</Link>
		</label>
	);
};
