import { Link } from "@tanstack/react-router";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import { categorySelectors } from "@/store/category/categorySlice";
import { useAppSelector } from "@/store/store";
import cover from "../../assets/images/furniture.jpg";

type Props = {
	className?: string;
};

export const CategoryList = ({ className }: Props) => {
	const categories = useAppSelector(categorySelectors.getCategories);

	if (!Object.keys(categories)) return null;

	return (
		<ul
			className={cn(
				"grid w-full gap-x-6 gap-y-14 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] max-md:justify-items-center",
				className,
			)}
		>
			{Object.entries(categories).map(([key, value]) => (
				<li
					className="flex flex-col max-w-[280px] gap-y-5 items-center "
					key={key}
				>
					<div className="rounded-3xl overflow-hidden w-full h-[180px] relative">
						<Link
							className="absolute w-full h-full top-0 left-0"
							to={Routes.Catalog}
						></Link>
						<img
							className="w-full h-full object-cover"
							alt={value[0].name}
							src={value[0].imageUrl ?? cover}
						/>
					</div>
					<ul className="flex flex-col gap-y-4 max-w-[250px] w-full self-center">
						{value.map((v, i) => (
							<li
								key={v.path}
								className={
									"text-lg hover:text-orange-400 duration-300 transition-colors ease " +
									(i === 0 ? "font-bold hover:text-orange-500" : "")
								}
							>
								<Link to={Routes.Catalog}>{v.name}</Link>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
};
