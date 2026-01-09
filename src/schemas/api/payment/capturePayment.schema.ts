import z from "zod";

export const capturePaymentSchema = z.object({
	sessionId: z.string().trim().nonempty(),
});

export type CapturePaymentSchema = z.infer<typeof capturePaymentSchema>;
