import z from "zod/v3";

export const accountverificationSearchParams = z.object({
	token: z.string().trim(),
});
