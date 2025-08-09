import { Link } from "@tanstack/react-router";
import logoIcon from "@/assets/icons/logo.svg";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	to?: (typeof Routes)["Main"] | (typeof Routes)["Admin"]["Base"];
};

export const Logo = ({ className, to = Routes.Main }: Props) => {
	return (
		<Link to={to} className={cn("", className)}>
			<img
				height={40}
				width={140}
				src={logoIcon}
				alt="Clickhouse"
				className="object-cover max-sm:w-[120px] max-sm:h-6"
			/>
		</Link>
	);
};
