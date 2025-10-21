import type { Nullable } from "./base";

export type Product = {
	name: string;
	categoryId: Nullable<number>;
	description: string;
	shortDescription: string;
	materialsAndCare: string;
	assemblyInstructionFileId: Nullable<string>;
	assemblyInstructionFileUrl: Nullable<string>;
};

export type ProductAdmin = Product & {
	id: number;
	createdAt: string;
	updatedAt: string;
	manufacturerId: number;
	isDeleted: boolean;
};

export type ProductSkuImage = {
	id: number;
	imageId: string;
	imageUrl: string;
};

export type ProductSkuPackage = {
	length: number;
	quantity: number;
	width: number;
	height: number;
	weight: number;
};

export type ProductSkuPackageAdmin = ProductSkuPackage & {
	id: number;
	createdAt: string;
	updatedAt: string;
};

export type ProductSku = {
	id: number;
	sku: string;
	quantity: number;
	price: number;
	salePrice: Nullable<number>;
	attributes: {
		color: string;
		width: string;
		height: string;
		length: string;
		weight?: string;
	} & {
		[key: string]: string;
	};
	images: ProductSkuImage[];
	packages: ProductSkuPackageAdmin[];
};

export type ProductSkuAdmin = ProductSku & {
	createdAt: string;
	updatedAt: string;
};
