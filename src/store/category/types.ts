import type { ApiSuccessResponse } from "@/types/api";
import type { Category } from "@/types/category";

export type GetCategoriesRequest = null;
export type GetCategoriesResponse = ApiSuccessResponse<Category[]>;
