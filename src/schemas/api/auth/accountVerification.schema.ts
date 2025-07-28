import z from "zod";

export const accountVerificationSchema = z.object({
	token: z.email({
		error: (iss) => {
			if (iss.input === undefined)
				return "Токен обязателен для подтверждение аккаунта";

			return undefined;
		},
	}),
});

export type AccountVerificationSchema = z.infer<
	typeof accountVerificationSchema
>;
