import z from "zod";
import {
	SignUpPasswordMaxLength,
	SignUpPasswordMinLength,
} from "@/const/schema";

export const updateProfileSchema = z
	.object({
		email: z.email().optional(),
		password: z
			.string()
			.trim()
			.min(SignUpPasswordMinLength, {
				error: `Пароль должен содержать не менее ${SignUpPasswordMinLength} символов.`,
			})
			.max(SignUpPasswordMaxLength, {
				error: `Пароль должен содержать не более ${SignUpPasswordMaxLength} символов.`,
			})
			.optional(),
		passwordConfirm: z
			.string()
			.trim()
			.min(SignUpPasswordMinLength, {
				error: `Подтверждение пароля должно содержать не менее ${SignUpPasswordMinLength} символов.`,
			})
			.max(SignUpPasswordMaxLength, {
				error: `Подтверждение пароля должно содержать не более ${SignUpPasswordMaxLength} символов.`,
			})
			.optional(),
	})
	.check((ctx) => {
		const providedOnlyPassword =
			ctx.value.password && !ctx.value.passwordConfirm;
		const providedOnlyConfirmation =
			!ctx.value.password && ctx.value.passwordConfirm;

		const notEqual =
			ctx.value.password &&
			ctx.value.passwordConfirm &&
			ctx.value.password !== ctx.value.passwordConfirm;

		const path = providedOnlyConfirmation ? "password" : "passwordConfirm";
		const message = notEqual
			? "Пароли не совпадают."
			: providedOnlyConfirmation
				? "Введите пароль."
				: "Подтвердите пароль.";

		if (providedOnlyPassword || providedOnlyConfirmation || notEqual) {
			ctx.issues.push({
				code: "custom",
				message,
				path: [path],
				input:
					providedOnlyPassword || notEqual
						? ctx.value.passwordConfirm
						: ctx.value.password,
			});
		}
	});

export type UpdateProfileSchema = z.Infer<typeof updateProfileSchema>;
