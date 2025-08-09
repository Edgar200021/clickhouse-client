import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "@/types/category";

type CategoryState = {
	categories: Category[];
	groupedCategories: Record<string, Category[]>;
	filteredCategories: Record<string, Category[]>;
	search: string;
};

const initialState: CategoryState = {
	categories: [],
	groupedCategories: {},
	filteredCategories: {},
	search: "",
};

export const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<Category[]>) => {
			const grouped = Object.groupBy(action.payload, (val) => {
				return val.path.includes(".")
					? val.path.slice(0, val.path.indexOf("."))
					: val.path;
			});

			for (const key in grouped) {
				const val = grouped[key];
				val?.sort((a, b) => a.path.localeCompare(b.path));
			}

			state.groupedCategories = grouped as Record<string, Category[]>;
			state.filteredCategories = grouped as Record<string, Category[]>;
			state.categories = action.payload;
		},
		setCategory: (state, action: PayloadAction<Category>) => {
			state.categories.push(action.payload);
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;

			state.filteredCategories = Object.fromEntries(
				Object.entries(state.groupedCategories)
					.map(([key, value]) => {
						const filtered = value.filter(
							(v) =>
								v.name
									.toLocaleLowerCase()
									.startsWith(action.payload.toLocaleLowerCase()) ||
								v.path
									.toLocaleLowerCase()
									.startsWith(action.payload.toLocaleLowerCase()),
						);
						return [key, filtered];
					})
					.filter(([_, filtered]) => filtered.length > 0),
			);
		},
	},
	selectors: {
		getCategories: (state) => state.categories,
		getCategory: (state, categoryId: Category["id"]) =>
			state.categories.find((c) => c.id === categoryId),
		getGroupedCategories: (state) => state.groupedCategories,
		getFilteredCategories: (state) => state.filteredCategories,
		getSearch: (state) => state.search,
	},
});

export const { selectors: categorySelectors, actions: categoryActions } =
	categorySlice;
