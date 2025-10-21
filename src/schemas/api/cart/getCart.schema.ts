import z from "zod";
import { Currency } from "@/types/currency.enum";

export const getCartSchema = z.object({
	currencyTo: z.enum(Currency).optional(),
});

export type GetCartSchema = z.Infer<typeof getCartSchema>;
