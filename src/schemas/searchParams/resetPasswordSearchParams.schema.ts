import z from "zod/v3";

export const resetPasswordSearchParams = z.object({
	token: z.string().trim().optional(),
});

export type resetPasswordSearchParams = z.infer<
	typeof resetPasswordSearchParams
>;
