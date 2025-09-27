import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = {
	className?: string;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export const Pagination = ({
	className,
	currentPage,
	totalPages,
	onPageChange,
}: Props) => {
	const getPages = () => {
		const pages: (number | string)[] = [];

		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			const delta = 2;
			const left = Math.max(2, currentPage - delta);
			const right = Math.min(totalPages - 1, currentPage + delta);

			pages.push(1);
			if (left > 2) pages.push("...");

			for (let i = left; i <= right; i++) pages.push(i);

			if (right < totalPages - 1) pages.push("...");

			pages.push(totalPages);
		}

		return pages;
	};

	if (totalPages <= 1) return null;

	const pages = getPages();

	return (
		<ul className={cn("flex items-center gap-x-2", className)}>
			{pages.map((page, idx) => (
				<li
					key={idx}
					className="w-10 h-10 rounded-sm text-black transition-colors duration-300 ease overflow-hidden"
				>
					{page === "..." ? (
						<span className="flex items-center justify-center w-full h-full">
							…
						</span>
					) : (
						<Button
							variant="ghost"
							className={cn(
								"cursor-pointer p-0 w-full h-full hover:text-white hover:bg-orange-500",
								{ "text-white bg-orange-500": currentPage === page },
							)}
							onClick={() => onPageChange(Number(page))}
						>
							{page}
						</Button>
					)}
				</li>
			))}
		</ul>
	);
};
