import z from "zod";
import { CategoryImageMaxSize } from "@/const/schema";

export const createCategorySchema = z.object({
	name: z.string(),
	path: z
		.string()
		.regex(/^[a-z]+$/i, "Поле может содержать только латинские буквы"),
	predefinedPath: z
		.string()
		.regex(
			/^[a-z]+(\.[a-z]+)?$/i,
			"Поле должно содержать одно слово или две части, разделённые точкой, только латинские буквы.",
		)
		.optional(),
	file: z
		.file()
		.mime(["image/jpeg", "image/png", "image/webp"])
		.max(CategoryImageMaxSize),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
