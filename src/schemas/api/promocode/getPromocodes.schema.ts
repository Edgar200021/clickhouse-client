import z from "zod";
import { GetPromocodesMaxLimit } from "@/const/schema";

export const getPromocodesSchema = z.object({
	limit: z.coerce.number().positive().max(GetPromocodesMaxLimit).optional(),
	page: z.coerce.number().positive().optional(),
	search: z.string().trim().nonempty().optional(),
});

export type GetPromocodesSchema = z.Infer<typeof getPromocodesSchema>;
