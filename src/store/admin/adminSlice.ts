import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Combined } from "@/types/api";
import type { Nullable } from "@/types/base";
import type { Manufacturer } from "@/types/manufacturer";
import type {
	ProductAdmin,
	ProductSku,
	ProductSkuAdmin,
} from "@/types/product";
import type { PromocodeAdmin } from "@/types/promocode";
import type {
	GetProductsRequest,
	GetProductsSkusAdminRequest,
	GetPromocodesRequest,
	GetUsersRequest,
} from "./types";

export type CombinedProductSkuAdmin = Combined<
	ProductSkuAdmin,
	ProductAdmin,
	"product"
>;

type AdminState = {
	manufacturers: Nullable<Manufacturer[]>;
	products: Nullable<ProductAdmin[]>;
	productsSkus: Nullable<CombinedProductSkuAdmin[]>;
	promocode: Nullable<PromocodeAdmin>;
	usersFilters: GetUsersRequest;
	productFilters: GetProductsRequest;
	productsSkusFilters: GetProductsSkusAdminRequest;
	promocodesFilters: GetPromocodesRequest;
};

const initialState: AdminState = {
	manufacturers: null,
	products: null,
	productsSkus: null,
	promocode: null,
	usersFilters: {},
	productFilters: {},
	productsSkusFilters: {},
	promocodesFilters: {},
};

export const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		setManufacturers: (state, action: PayloadAction<Manufacturer[]>) => {
			state.manufacturers = action.payload;
		},
		setManufacturer: (state, action: PayloadAction<Manufacturer>) => {
			state.manufacturers?.push(action.payload);
		},
		updateManufacturer: (state, { payload }: PayloadAction<Manufacturer>) => {
			if (!state.manufacturers) return;

			const index = state.manufacturers.findIndex((c) => c.id === payload.id);
			if (index === -1) return;

			state.manufacturers[index] = payload;
		},

		deleteManufactory: (
			state,
			{ payload }: PayloadAction<Manufacturer["id"]>,
		) => {
			if (!state.manufacturers) return;

			const index = state.manufacturers.findIndex((c) => c.id === payload);
			if (index === -1) return;

			state.manufacturers.splice(index, 1);
		},
		setUsersFilters: <T extends keyof AdminState["usersFilters"]>(
			state: AdminState,
			{
				payload,
			}: PayloadAction<{
				key: T;
				val: AdminState["usersFilters"][T];
			}>,
		) => {
			state.usersFilters[payload.key] = payload.val;
		},
		setProducts: (state, action: PayloadAction<ProductAdmin[]>) => {
			state.products = action.payload;
		},
		setProduct: (state, action: PayloadAction<ProductAdmin>) => {
			state.products?.push(action.payload);
		},
		updateProduct: (state, { payload }: PayloadAction<ProductAdmin>) => {
			if (!state.products) return;

			const index = state.products.findIndex((p) => p.id === payload.id);
			if (index === -1) return;

			state.products[index] = payload;
		},
		setProductFilters: <T extends keyof AdminState["productFilters"]>(
			state: AdminState,
			{
				payload,
			}: PayloadAction<{
				key: T;
				val: AdminState["productFilters"][T];
			}>,
		) => {
			state.productFilters[payload.key] = payload.val;
		},

		setProductsSkus: (
			state,
			action: PayloadAction<CombinedProductSkuAdmin[]>,
		) => {
			state.productsSkus = action.payload;
		},

		setProductSku: (state, action: PayloadAction<CombinedProductSkuAdmin>) => {
			state.productsSkus?.push(action.payload);
		},

		updateProductSku: (
			state,
			{ payload }: PayloadAction<CombinedProductSkuAdmin>,
		) => {
			if (!state.productsSkus) return;

			const index = state.productsSkus.findIndex((p) => p.id === payload.id);
			if (index === -1) return;

			state.productsSkus[index] = payload;
		},

		setProductsSkusFilters: <T extends keyof AdminState["productsSkusFilters"]>(
			state: AdminState,
			{
				payload,
			}: PayloadAction<{
				key: T;
				val: AdminState["productsSkusFilters"][T];
			}>,
		) => {
			state.productsSkusFilters[payload.key] = payload.val;
		},

		setPromocode: (state, action: PayloadAction<PromocodeAdmin>) => {
			state.promocode = action.payload;
		},

		setPromocodesFilters: <T extends keyof AdminState["promocodesFilters"]>(
			state: AdminState,
			{
				payload,
			}: PayloadAction<{
				key: T;
				val: AdminState["promocodesFilters"][T];
			}>,
		) => {
			state.promocodesFilters[payload.key] = payload.val;
		},
	},
	selectors: {
		getManufactories: (state) => state.manufacturers,
		getManufacturer: (state, id: Manufacturer["id"]) => {
			return state.manufacturers?.find((m) => m.id === id);
		},
		getUsersFilters: (state) => state.usersFilters,
		getUsersFiltersSearch: (state) => state.usersFilters.search,
		getUsersFiltersIsBanned: (state) => state.usersFilters.isBanned,
		getUsersFiltersIsVerified: (state) => state.usersFilters.isVerified,
		getUsersFiltersLimit: (state) => state.usersFilters.limit,

		getProducts: (state) => state.products,
		getProduct: (state, id: ProductAdmin["id"]) => {
			return state.products?.find((p) => p.id === id);
		},
		getProductFilters: (state) => state.productFilters,
		getProductFiltersSearch: (state) => state.productFilters.search,
		getProductFiltersIsDeleted: (state) => state.productFilters.isDeleted,
		getProductFiltersLimit: (state) => state.productFilters.limit,

		getProductsSkus: (state) => state.productsSkus,
		getProductSku: (state, id: ProductSku["id"]) => {
			return state.productsSkus?.find((p) => p.id === id);
		},
		getProductsSkusFilters: (state) => state.productsSkusFilters,
		getProductsSkusFiltersSearch: (state) => state.productsSkusFilters.search,
		getProductsSkusFiltersIsDeleted: (state) =>
			state.productsSkusFilters.isDeleted,
		getProductsSkusFiltersLimit: (state) => state.productsSkusFilters.limit,
		getProductsSkusFiltersSku: (state) => state.productsSkusFilters.sku,
		getProductsSkusFiltersMinPrice: (state) =>
			state.productsSkusFilters.minPrice,
		getProductsSkusFiltersMaxPrice: (state) =>
			state.productsSkusFilters.maxPrice,
		getProductsSkusFiltersMinSalePrice: (state) =>
			state.productsSkusFilters.minSalePrice,
		getProductsSkusFiltersMaxSalePrice: (state) =>
			state.productsSkusFilters.maxSalePrice,

		getPromocode: (state) => state.promocode,
		getPromocodesFilters: (state) => state.promocodesFilters,
		getPromocodesFiltersSearch: (state) => state.promocodesFilters.search,
		getPromocodesFiltersLimit: (state) => state.promocodesFilters.limit,
	},
});

export const { selectors: adminSelectors, actions: adminActions } = adminSlice;
