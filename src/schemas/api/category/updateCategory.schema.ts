import z from "zod";

import type { Category } from "@/types/category";
import { createCategorySchema } from "./createCategory.schema";

export const updateCategorySchema = createCategorySchema.partial().extend({
	categoryId: z.custom<Category["id"]>(),
});

export type UpdateCategorySchema = z.Infer<typeof updateCategorySchema>;
