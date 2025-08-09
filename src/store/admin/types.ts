import type { CreateCategorySchema } from "@/schemas/api/category/createCategory.schema";
import type { ApiSuccessResponse } from "@/types/api";
import type { Category } from "@/types/category";

export type CreateCategoryRequest = CreateCategorySchema;
export type CreateCategoryResponse = ApiSuccessResponse<Category>;
