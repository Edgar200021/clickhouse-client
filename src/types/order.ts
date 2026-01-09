import type { Nullable } from "./base";
import type { Currency } from "./currency.enum";
import type { Product, ProductSkuAdmin } from "./product";
import type { PromocodeAdmin } from "./promocode";
import type { User } from "./user";

export enum OrderStatus {
	Cancelled = "cancelled",
	Delivered = "delivered",
	Paid = "paid",
	Pending = "pending",
	Shipped = "shipped",
}

export type AdminOrder = {
	id: number;
	userId: User["id"];
	createdAt: string;
	updatedAt: string;
	number: string;
	name: string;
	email: string;
	currency: Currency;
	total: number;
	phoneNumber: string;
	status: OrderStatus;
	billingAddressCity: string;
	billingAddressHome: string;
	billingAddressStreet: string;
	billingAddressApartment: string;
	deliveryAddressCity: string;
	deliveryAddressStreet: string;
	deliveryAddressHome: string;
	deliveryAddressApartment: string;
	promocode: Nullable<
		Pick<PromocodeAdmin, "id" | "code" | "type" | "discountValue">
	>;
	preview: {
		imageUrL: string;
		orderItemCount: number;
	};
};

export type Order = Omit<
	AdminOrder,
	"id" | "promocodeId" | "userId" | "updatedAt" | "promcoode"
> & { promocode: Omit<AdminOrder["promocode"], "id"> };

export type SpecificAdminOrder = Omit<Order, "preview"> & {
	orderItems: {
		productSkuId: ProductSkuAdmin["id"];
		name: Product["name"];
		quantity: number;
		price: number;
		image: string;
	}[];
};

export type SpecificOrder = Omit<SpecificAdminOrder, "orderItems"> & {
	paymentTimeoutInMinutes: number;
	orderItems: {
		name: Product["name"];
		quantity: number;
		price: number;
		image: string;
	}[];
};
