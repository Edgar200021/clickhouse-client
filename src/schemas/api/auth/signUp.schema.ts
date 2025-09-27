import z from "zod";
import {
	SignUpPasswordMaxLength,
	SignUpPasswordMinLength,
} from "@/const/schema";

export const signUpSchema = z
	.object({
		email: z.email({
			error: (iss) => {
				if (iss.input === undefined)
					return "Поле email обязательно для заполнения.";
				if (iss.code === "invalid_format") return "Некорректный формат email.";
				return undefined;
			},
		}),
		password: z
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
		passwordConfirm: z
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
		personalDataConsent: z.literal(true, {
			error: "Необходимо согласие на обработку персональных данных.",
		}),
	})
	.refine((obj) => obj.password === obj.passwordConfirm, {
		path: ["passwordConfirm"],
		error: "Пароли не совпадают.",
	});

export type SignUpSchema = z.Infer<typeof signUpSchema>;
