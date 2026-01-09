import { OrderStatus } from "@/types/order";

export const StatusLabels: Record<OrderStatus | string, string> = {
	[OrderStatus.Pending]: "Ожидает оплаты",
	[OrderStatus.Paid]: "Оплачен",
	[OrderStatus.Shipped]: "Отправлен",
	[OrderStatus.Delivered]: "Доставлен",
	[OrderStatus.Cancelled]: "Отменён",
};
