import type { Combined } from "./api";
import type { Product, ProductSku } from "./product";

export type CartItem = {
	id: number;
	quantity: number;
};

export type CartItemCombined = Combined<
	CartItem &
		Pick<ProductSku, "sku" | "currency" | "price" | "salePrice" | "images"> & {
			productSkuId: ProductSku["id"];
			productSkuQuantity: ProductSku["quantity"];
		},
	Pick<Product, "name" | "shortDescription">,
	"product"
>;
