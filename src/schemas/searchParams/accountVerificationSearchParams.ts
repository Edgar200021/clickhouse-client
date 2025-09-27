import z from "zod";

export const accountverificationSearchParams = z.object({
	token: z.string().trim(),
});
