import z from "zod";
import {
	ProductSkuImageMaxSize,
	ProductSkuImagesMaxLength,
	ProductSkuImagesMinLength,
	ProductSkuPackagesMaxLength,
	ProductSkuPackagesMinLength,
} from "@/const/schema";

export const productSkuPackageSchema = z.object({
	id: z.uuid(),
	length: z.number().positive(),
	quantity: z.number().positive(),
	width: z.number().positive(),
	height: z.number().positive(),
	weight: z.number().positive(),
});

export const createProductSkuSchema = z
	.object({
		productId: z.number().positive(),
		quantity: z.number().positive(),
		price: z.number().positive(),
		salePrice: z
			.number()
			.transform((num) => (num > 0 ? num : undefined))
			.optional(),
		width: z.number().positive(),
		height: z.number().positive(),
		length: z.number().positive(),
		weight: z
			.number()
			.transform((num) => (num > 0 ? num : undefined))
			.optional(),
		color: z.string().trim().nonempty(),
		packages: productSkuPackageSchema
			.array()
			.min(ProductSkuPackagesMinLength)
			.max(ProductSkuPackagesMaxLength)
			.optional(),
		images: z
			.object({
				id: z.uuid(),
				file: z
					.file()
					.max(ProductSkuImageMaxSize)
					.mime(["image/jpeg", "image/png", "image/webp"]),
			})
			.array()
			.min(ProductSkuImagesMinLength)
			.max(ProductSkuImagesMaxLength),
	})
	.refine((obj) => (obj.salePrice ? obj.salePrice < obj.price : true), {
		error: "Sale price must be less than the regular price",
	});

export type CreateProductSkuSchema = z.Infer<typeof createProductSkuSchema>;
export type ProductSkuPackageSchema = z.Infer<typeof productSkuPackageSchema>;
