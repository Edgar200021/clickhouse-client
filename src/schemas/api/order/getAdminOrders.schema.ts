import z from "zod";
import { GetOrdersMaxLimit } from "@/const/schema";
import { OrderStatus } from "@/types/order";

export const getAdminOrdersSchema = z.object({
	search: z.string().trim().nonempty().optional(),
	status: z.enum(OrderStatus).optional(),
	limit: z.coerce.number().positive().max(GetOrdersMaxLimit).optional(),
	page: z.coerce.number().positive().optional(),
});

export type GetAdminOrdersSchema = z.Infer<typeof getAdminOrdersSchema>;
