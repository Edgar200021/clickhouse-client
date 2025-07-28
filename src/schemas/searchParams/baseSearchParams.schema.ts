import z from "zod/v3";

export const baseSearchParams = z.object({
	redirect: z.string().trim().optional(),
});
