import z from "zod/v3";

export const getProductsFiltersSchema = z.object({
	search: z.string().trim().optional(),
});

export type GetProductsFiltersSchema = z.infer<typeof getProductsFiltersSchema>;
