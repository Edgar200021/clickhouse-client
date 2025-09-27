import z from "zod";
import { GetUsersMaxLimit } from "@/const/schema";

export const getUsersSchema = z.object({
	search: z.string().trim().nonempty().optional(),
	limit: z.coerce.number().positive().max(GetUsersMaxLimit).optional(),
	page: z.coerce.number().positive().optional(),
	isVerified: z.coerce.boolean().optional(),
	isBanned: z.coerce.boolean().optional(),
});

export type GetUsersSchema = z.Infer<typeof getUsersSchema>;
