import type z from "zod";
import { getAdminOrdersSchema } from "./getAdminOrders.schema";

export const getOrdersSchema = getAdminOrdersSchema.omit({
	search: true,
});

export type GetOrdersSchema = z.Infer<typeof getOrdersSchema>;
