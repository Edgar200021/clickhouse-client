import type { Nullable } from "./base";
import type { Currency } from "./currency.enum";
import type { Product } from "./product";
import type { Promocode } from "./promocode";

export enum OrderStatus {
	Cancelled = "cancelled",
	Delivered = "delivered",
	Paid = "paid",
	Pending = "pending",
	Shipped = "shipped",
}

export type Order = {
	number: string;
	name: string;
	createdAt: string;
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
	promocode: Nullable<Pick<Promocode, "code" | "type" | "discountValue">>;
	preview: {
		imageUrL: string;
		orderItemCount: number;
	};
};

export type SpecificOrder = Omit<Order, "preview"> & {
	orderItems: {
		name: Product["name"];
		quantity: number;
		price: number;
		image: string;
	}[];
	paymentTimeoutInMinutes: number;
};
