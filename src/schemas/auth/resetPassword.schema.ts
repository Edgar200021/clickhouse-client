import z from "zod";
import {
	SignUpPasswordMaxLength,
	SignUpPasswordMinLength,
} from "@/const/schema";

export const resetPassowrdSchema = z.object({
	token: z.string({
		error: (iss) => {
			if (iss.input === undefined)
				return "Токен обязателен для восстановления пароля.";
			return undefined;
		},
	}),
	password: z
		.string({
			error: (iss) => {
				if (iss.input === undefined) return "Пароль обязателен для заполнения.";
				return undefined;
			},
		})
		.min(SignUpPasswordMinLength, {
			error: `Пароль должен содержать не менее ${SignUpPasswordMinLength} символов.`,
		})
		.max(SignUpPasswordMaxLength, {
			error: `Пароль должен содержать не более ${SignUpPasswordMaxLength} символов.`,
		}),
});

export type ResetPasswordSchema = z.infer<typeof resetPassowrdSchema>;
