import z from "zod";
import {
	SignUpPasswordMaxLength,
	SignUpPasswordMinLength,
} from "@/const/schema";

export const signInSchema = z.object({
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

export type SignInSchema = z.Infer<typeof signInSchema>;
