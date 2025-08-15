import type { CreateCategorySchema } from "@/schemas/api/category/createCategory.schema";
import type { UpdateCategorySchema } from "@/schemas/api/category/updateCategory.schema";
import type { CreateManufacturerSchema } from "@/schemas/api/manufacturer/createManufacturer.schema";
import type { UpdateManufacturerSchema } from "@/schemas/api/manufacturer/updateManufacturer.schema";
import type { BlockToggleSchema } from "@/schemas/api/user/blockToggle.schema";
import type { GetUsersSchema } from "@/schemas/api/user/getUsers.schema";

import type { ApiSuccessResponse, WithCountResponse } from "@/types/api";
import type { Category } from "@/types/category";
import type { Manufacturer } from "@/types/manufacturer";
import type { AdminUser } from "@/types/user";

export type CreateCategoryRequest = CreateCategorySchema;
export type CreateCategoryResponse = ApiSuccessResponse<Category>;

export type UpdateCategoryRequest = UpdateCategorySchema;
export type UpdateCategoryResponse = ApiSuccessResponse<Category>;

export type DeleteCategoryRequest = {
	categoryId: Category["id"];
};
export type DeleteCategoryResponse = ApiSuccessResponse<null>;

export type GetManufacturersRequest = null;
export type GetManufacturersResponse = ApiSuccessResponse<Manufacturer[]>;

export type GetManufacturerRequest = {
	manufacturerId: Manufacturer["id"];
};
export type GetManufacturerResponse = ApiSuccessResponse<Manufacturer>;

export type CreateManufacturerRequest = CreateManufacturerSchema;
export type CreateManufacturerResponse = ApiSuccessResponse<Manufacturer>;

export type UpdateManufacturerRequest = UpdateManufacturerSchema;
export type UpdateManufacturerResponse = ApiSuccessResponse<Manufacturer>;

export type DeleteManufacturerRequest = {
	manufacturerId: Manufacturer["id"];
};
export type DeleteManufacturerResponse = ApiSuccessResponse<null>;

export type GetUsersRequest = GetUsersSchema;
export type GetUsersResponse = ApiSuccessResponse<
	WithCountResponse<AdminUser[], "users">
>;

export type BlockToggleRequest = BlockToggleSchema;
export type BlockToggleResponse = ApiSuccessResponse<null>;
