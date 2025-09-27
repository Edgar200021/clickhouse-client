import z from "zod";
import { GetProductsMaxLimit } from "@/const/schema";

export const getProductsSchema = z.object({
	search: z.string().trim().optional(),
	limit: z.coerce.number().positive().max(GetProductsMaxLimit).optional(),
	page: z.coerce.number().positive().optional(),
	isDeleted: z.coerce.boolean().optional(),
});

export type GetProductsSchema = z.Infer<typeof getProductsSchema>;
