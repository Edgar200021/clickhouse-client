import { Link } from "@tanstack/react-router";
import baketIcon from "@/assets/icons/basket.svg";
import sprites from "@/assets/icons/sprites.svg";
import favoriteIcon from "@/assets/icons/star.svg";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import { AuthDirection } from "../Auth/AuthDirection";

type Props = {
	className?: string;
};

export const HeaderPart = ({ className }: Props) => {
	return (
		<div className={cn("flex items-center gap-x-4", className)}>
			<Link className="w-6 h-6 text-red-500 " to={Routes.Favorite}>
				<img
					className="w-full h-full object-contain"
					alt="Favorite"
					src={favoriteIcon}
				/>
				{/*<svg width={24} height={24}>
					<use xlinkHref={`${sprites}#facebook`} />
				</svg>*/}
			</Link>
			<Link className="w-6 h-6 " to={Routes.Cart}>
				<img
					className="w-full h-full object-contain"
					alt="Favorite"
					src={baketIcon}
				/>
				{/* <svg width={24} height={24}> */}
				{/* 	<use xlinkHref={`${sprites}#basket`} /> */}
				{/* </svg> */}
			</Link>
			<AuthDirection />
		</div>
	);
};
