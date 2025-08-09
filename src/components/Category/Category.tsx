import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export const Category = ({ className }: Props) => {
	return <div className={cn("", className)}>Footer</div>;
};
