import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export const Footer = ({ className }: Props) => {
	return <div className={cn("", className)}>Footer</div>;
};
