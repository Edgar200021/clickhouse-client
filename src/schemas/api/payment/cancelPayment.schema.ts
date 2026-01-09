import z from "zod";

export const cancelPaymentSchema = z.object({
	sessionId: z.string().trim().nonempty(),
});

export type CancelPaymentSchema = z.infer<typeof cancelPaymentSchema>;