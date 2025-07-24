import { Link } from "@tanstack/react-router";
import basketIcon from "@/assets/icons/basket.svg";
import starIcon from "@/assets/icons/star.svg";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import { AuthDirection } from "../AuthDirection";

type Props = {
	className?: string;
};

export const HeaderPart = ({ className }: Props) => {
	return (
		<div className={cn("flex items-center gap-x-4", className)}>
			<Link className="w-6 h-6" to={Routes.Favorite}>
				<img src={starIcon} className="w-full h-full" />
			</Link>
			<Link className="w-6 h-6" to={Routes.Basket}>
				<img src={basketIcon} className="w-full h-full" />
			</Link>
			<AuthDirection />
		</div>
	);
};
