import z from "zod";

export const forgotPassowrdSchema = z.object({
	email: z.email({
		error: (iss) => {
			if (iss.input === undefined)
				return "Поле email обязательно для заполнения.";
			if (iss.code === "invalid_format") return "Некорректный формат email.";
			return undefined;
		},
	}),
});

export type ForgotPasswordSchema = z.Infer<typeof forgotPassowrdSchema>;
