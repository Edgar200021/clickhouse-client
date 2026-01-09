import type { CreateOrderSchema } from "@/schemas/api/order/createOrder.schema";
import type { GetOrdersSchema } from "@/schemas/api/order/getOrders.schema";
import type { ApiSuccessResponse, WithPageCountResponse } from "@/types/api";
import type { Order, SpecificOrder } from "@/types/order";

export type CreateOrderRequest = CreateOrderSchema;
export type CreateOrderResponse = ApiSuccessResponse<{
	orderNumber: string;
}>;

export type GetOrdersRequest = GetOrdersSchema;
export type GetOrdersResponse = ApiSuccessResponse<
	WithPageCountResponse<Order[], "orders">
>;

export type GetOrderRequest = {
	orderNumber: string;
};
export type GetOrderResponse = ApiSuccessResponse<SpecificOrder>;
