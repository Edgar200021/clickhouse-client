import type { CreateOrderSchema } from "@/schemas/api/order/createOrder.schema";
import type { ApiSuccessResponse } from "@/types/api";
import type { Order, SpecificOrder } from "@/types/order";

export type CreateOrderRequest = CreateOrderSchema;
export type CreateOrderResponse = ApiSuccessResponse<{
	orderNumber: string;
}>;

export type GetOrdersRequest = null;
export type GetOrdersResponse = ApiSuccessResponse<Order[]>;

export type GetOrderRequest = {
	orderNumber: string;
};
export type GetOrderResponse = ApiSuccessResponse<SpecificOrder>;
