import type { CreateCategorySchema } from "@/schemas/api/category/createCategory.schema";
import type { UpdateCategorySchema } from "@/schemas/api/category/updateCategory.schema";
import type { CreateManufacturerSchema } from "@/schemas/api/manufacturer/createManufacturer.schema";
import type { UpdateManufacturerSchema } from "@/schemas/api/manufacturer/updateManufacturer.schema";
import type { CreateProductSkuSchema } from "@/schemas/api/productSku/createProductSku.schema";
import type { GetProductsSkusAdminSchema } from "@/schemas/api/productSku/getProductsSkusAdmin.schema";
import type { UpdateProductSkuSchema } from "@/schemas/api/productSku/updateProductSku.schema";
import type { CreateProductSchema } from "@/schemas/api/products/createProduct.schema";
import type { GetProductsSchema } from "@/schemas/api/products/getProducts.schema";
import type { RemoveProductAssemblyInstructionSchema } from "@/schemas/api/products/removeProductAssemblyInstruction.schema";
import type { UpdateProductSchema } from "@/schemas/api/products/updateProduct.schema";
import type { CreatePromocodeSchema } from "@/schemas/api/promocode/createPromocode.schema";
import type { GetPromocodesSchema } from "@/schemas/api/promocode/getPromocodes.schema";
import type { UpdatePromocodeSchema } from "@/schemas/api/promocode/updatePromocode.schema";
import type { BlockToggleSchema } from "@/schemas/api/user/blockToggle.schema";
import type { GetUsersSchema } from "@/schemas/api/user/getUsers.schema";
import type { ApiSuccessResponse, WithPageCountResponse } from "@/types/api";
import type { Category } from "@/types/category";
import type { Manufacturer } from "@/types/manufacturer";
import type {
	ProductAdmin,
	ProductSkuAdmin,
	ProductSkuImage,
	ProductSkuPackageAdmin,
} from "@/types/product";
import type { PromocodeAdmin } from "@/types/promocode";
import type { AdminUser } from "@/types/user";
import type { CombinedProductSkuAdmin } from "./adminSlice";

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
	WithPageCountResponse<AdminUser[], "users">
>;

export type BlockToggleRequest = BlockToggleSchema;
export type BlockToggleResponse = ApiSuccessResponse<null>;

export type GetProductsRequest = GetProductsSchema;
export type GetProductsResponse = ApiSuccessResponse<
	WithPageCountResponse<ProductAdmin[], "products">
>;

export type GetProductRequest = {
	productId: ProductAdmin["id"];
};
export type GetProductResponse = ApiSuccessResponse<ProductAdmin>;

export type CreateProductRequest = CreateProductSchema;
export type CreateProductResponse = ApiSuccessResponse<ProductAdmin>;

export type UpdateProductRequest = UpdateProductSchema;
export type UpdateProductResponse = ApiSuccessResponse<ProductAdmin>;

export type DeleteProductRequest = {
	productId: ProductAdmin["id"];
};
export type DeleteProductResponse = ApiSuccessResponse<null>;

export type RemoveProductAssemblyInstructionRequest =
	RemoveProductAssemblyInstructionSchema;
export type RemoveProductAssemblyInstructionResponse = ApiSuccessResponse<null>;

export type GetProductsSkusAdminRequest = GetProductsSkusAdminSchema;
export type GetProductsSkusAdminResponse = ApiSuccessResponse<
	WithPageCountResponse<CombinedProductSkuAdmin[], "productsSkus">
>;

export type GetProductSkuRequest = {
	productSkuId: ProductSkuAdmin["id"];
};
export type GetProductSkuResponse = ApiSuccessResponse<CombinedProductSkuAdmin>;

export type CreateProductSkuRequest = CreateProductSkuSchema;
export type CreateProductSkuResponse = ApiSuccessResponse<ProductSkuAdmin>;

export type UpdateProductSkuRequest = UpdateProductSkuSchema;
export type UpdateProductSkuResponse = ApiSuccessResponse<ProductSkuAdmin>;

export type DeleteProductSkuRequest = {
	productSkuId: ProductSkuAdmin["id"];
};
export type DeleteProductSkuResponse = ApiSuccessResponse<null>;

export type RemoveProductSkuImageRequest = {
	productSkuId: ProductSkuAdmin["id"];
	imageId: ProductSkuImage["id"];
};
export type RemoveProductSkuImageResponse = ApiSuccessResponse<null>;

export type RemoveProductSkuPackageRequest = {
	productSkuId: ProductSkuAdmin["id"];
	packageId: ProductSkuPackageAdmin["id"];
};
export type RemoveProductSkuPackageResponse = ApiSuccessResponse<null>;

export type GetPromocodesRequest = GetPromocodesSchema;
export type GetPromocodesResponse = ApiSuccessResponse<
	WithPageCountResponse<PromocodeAdmin[], "promocodes">
>;

export type GetPromocodeRequest = {
	promocodeId: PromocodeAdmin["id"];
};
export type GetPromocodeResponse = ApiSuccessResponse<PromocodeAdmin>;

export type CreatePromocodeRequest = CreatePromocodeSchema;
export type CreatePromocodeResponse = ApiSuccessResponse<PromocodeAdmin>;

export type UpdatePromocodeRequest = UpdatePromocodeSchema;
export type UpdatePromocodeResponse = ApiSuccessResponse<PromocodeAdmin>;

export type DeletePromocodeRequest = {
	promocodeId: PromocodeAdmin["id"];
};
export type DeletePromocodeResponse = ApiSuccessResponse<null>;
