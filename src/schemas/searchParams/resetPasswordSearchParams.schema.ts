import z from "zod";

export const resetPasswordSearchParams = z.object({
	token: z.string().trim(),
});
