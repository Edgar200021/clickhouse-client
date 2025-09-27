import z from "zod";
import {
	CategoryImageMaxSize,
	CategoryNameMaxLength,
	CategoryPathMaxLength,
	CategoryPredefinedPathMaxLength,
} from "@/const/schema";

export const createCategorySchema = z.object({
	name: z.string().nonempty().max(CategoryNameMaxLength),
	path: z
		.string()
		.regex(/^[a-z]+$/i, "Поле может содержать только латинские буквы")
		.max(CategoryPathMaxLength),
	predefinedPath: z
		.string()
		.regex(
			/^[a-z]+(\.[a-z]+)?$/i,
			"Поле должно содержать одно слово или две части, разделённые точкой, только латинские буквы.",
		)
		.max(CategoryPredefinedPathMaxLength)
		.optional(),
	image: z
		.file()
		.mime(["image/jpeg", "image/png", "image/webp"])
		.max(CategoryImageMaxSize),
});

export type CreateCategorySchema = z.Infer<typeof createCategorySchema>;
