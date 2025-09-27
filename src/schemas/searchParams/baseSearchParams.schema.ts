import z from "zod";

export const baseSearchParams = z.object({
	redirect: z.string().trim().optional(),
});
