import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export const Footer = ({ className }: Props) => {
	return <footer className={cn("", className)}>Footer</footer>;
};
