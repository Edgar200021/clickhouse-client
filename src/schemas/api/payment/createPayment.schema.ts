import z from "zod";

export const createPaymentSchema = z.object({
	orderNumber: z.uuid().trim().nonempty(),
});

export type CreatePaymentSchema = z.infer<typeof createPaymentSchema>;
