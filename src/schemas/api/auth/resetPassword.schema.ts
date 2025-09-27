import z from "zod";
import {
	SignUpPasswordMaxLength,
	SignUpPasswordMinLength,
} from "@/const/schema";

export const resetPasswordSchema = z
	.object({
		token: z.string({
			error: (iss) => {
				if (iss.input === undefined)
					return "Токен обязателен для восстановления пароля.";
				return undefined;
			},
		}),
		newPassword: z
			.string({
				error: (iss) => {
					if (iss.input === undefined)
						return "Пароль обязателен для заполнения.";
					return undefined;
				},
			})
			.min(SignUpPasswordMinLength, {
				error: `Пароль должен содержать не менее ${SignUpPasswordMinLength} символов.`,
			})
			.max(SignUpPasswordMaxLength, {
				error: `Пароль должен содержать не более ${SignUpPasswordMaxLength} символов.`,
			}),
		newPasswordConfirm: z
			.string({
				error: (iss) => {
					if (iss.input === undefined)
						return "Подтверждение пароля обязательно.";
					return undefined;
				},
			})
			.min(SignUpPasswordMinLength, {
				error: `Подтверждение пароля должно содержать не менее ${SignUpPasswordMinLength} символов.`,
			})
			.max(SignUpPasswordMaxLength, {
				error: `Подтверждение пароля должно содержать не более ${SignUpPasswordMaxLength} символов.`,
			}),
	})
	.refine((obj) => obj.newPassword === obj.newPasswordConfirm, {
		path: ["passwordConfirm"],
		error: "Пароли не совпадают.",
	});

export type ResetPasswordSchema = z.Infer<typeof resetPasswordSchema>;
