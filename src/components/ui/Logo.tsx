import { Routes } from "@/const/routes";
import { Link } from "@tanstack/react-router";
import logoIcon from "@/assets/icons/logo.svg";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export const Logo = ({ className }: Props) => {
	return (
		<Link to={Routes.Main} className={cn("", className)}>
			<img
				height={40}
				width={140}
				src={logoIcon}
				alt="Clickhouse"
				className="object-cover"
			/>
		</Link>
	);
};
