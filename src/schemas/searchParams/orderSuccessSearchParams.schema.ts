import z from "zod";

export const orderSuccessSearchParamsSchema = z.object({
	sessionId: z.string().trim().nonempty().optional(),
	type: z.literal(["cancel"]).optional()
});