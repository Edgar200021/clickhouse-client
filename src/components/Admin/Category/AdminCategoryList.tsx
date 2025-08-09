import { categorySelectors } from "@/store/category/categorySlice";
import { useAppSelector } from "@/store/store";
import { AdminCategory } from "./AdminCategory";

export const AdminCategoryList = () => {
	const categories = useAppSelector(categorySelectors.getGroupedCategories);
	const filteredCategories = useAppSelector(
		categorySelectors.getFilteredCategories,
	);

	return (
		<ul className="flex flex-col gap-y-16">
			{Object.entries(filteredCategories).map(([key, value]) => {
				const root = categories[key].find((v) => v.path === key);
				return (
					<li className="flex flex-col gap-y-10" key={key}>
						<h2 className="text-orange-500 text-3xl">{root?.name}</h2>
						<ul className="flex flex-wrap gap-8 pl-10">
							{value.map((cat) => (
								<li key={cat.path}>
									<AdminCategory category={cat} />
								</li>
							))}
						</ul>
					</li>
				);
			})}
		</ul>
	);
};
