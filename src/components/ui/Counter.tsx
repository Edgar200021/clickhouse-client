import type { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type Props = {
	className?: string;
	disabled: boolean;
	value: number;
	setValue: Dispatch<SetStateAction<number>>;
};

export const Counter = ({ value, setValue, disabled, className }: Props) => {
	return (
		<div className={cn("flex items-center gap-x-3", className)}>
			<Button
				disabled={value === 1}
				onClick={() => setValue((prev) => prev - 1)}
				variant="ghost"
				className="flex items-center justify-center rounded-[5px] border-[2px] border-[#7d7d7d] text-[#7d7d7d] text-lg cursor-pointer p-0 w-[24px] h-[24px] relative z-20"
			>
				-
			</Button>
			<span className="text-lg font-bold">{value}</span>
			<Button
				disabled={disabled}
				onClick={() => setValue((prev) => prev + 1)}
				variant="ghost"
				className="flex items-center justify-center rounded-[5px] border-[2px] border-[#7d7d7d] text-[#7d7d7d] text-lg cursor-pointer p-0 w-[24px] h-[24px] relative z-20"
			>
				+
			</Button>
		</div>
	);
};
