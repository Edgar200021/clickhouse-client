import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import {
	ArrowRight,
	Calendar,
	Copy,
	MapPin,
	Package,
	ShoppingBag,
	TicketPercent,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import type { AdminOrder, Order as TOrder } from "@/types/order";
import { UserRole } from "@/types/user";

interface Props {
	className?: string;
	type:
		| { role: UserRole.Regular; order: TOrder }
		| { role: UserRole.Admin; order: AdminOrder };
}

export const OrderNumber = ({ number }: { number: TOrder["number"] }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async (e: React.MouseEvent) => {
		e.stopPropagation();
		try {
			await navigator.clipboard.writeText(String(number));
			setCopied(true);
			setTimeout(() => setCopied(false), 1000);
		} catch {
			console.error("Не удалось скопировать номер заказа");
		}
	};

	return (
		<div
			className="flex flex-col gap-2 select-text"
			onClick={(e) => e.stopPropagation()}
		>
			<Button
				type="button"
				onClick={handleCopy}
				onMouseDown={(e) => e.stopPropagation()}
				className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition cursor-pointer w-fit"
				title="Скопировать номер заказа"
				variant="ghost"
			>
				<Copy size={14} />
				{copied ? "Скопировано" : "Копировать"}
			</Button>
			<CardTitle className="text-lg font-semibold tracking-tight relative z-20">
				Заказ <span className="font-mono">#{number}</span>
			</CardTitle>
		</div>
	);
};

export const Order = ({ className, type: { order, role } }: Props) => {
	const navigate = useNavigate();
	const status = getStatusData(order.status);

	return (
		<Card
			className={cn(
				"group relative w-full max-w-[1000px] overflow-hidden border-border/60 rounded-2xl transition hover:border-primary/40 hover:shadow-md cursor-pointer",
				className,
			)}
			onClick={() =>
				navigate({
					to:
						role === UserRole.Regular
							? Routes.Orders.SpecificOrder
							: Routes.Admin.SpecificOrder,
					params: { orderNumber: order.number },
				})
			}
		>
			<CardHeader className="flex flex-row justify-between border-b bg-muted/20 py-3 px-5">
				<div>
					<OrderNumber number={order.number} />
					<div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
						<Calendar size={14} />
						{role === UserRole.Admin ? (
							<div className="flex flex-col gap-y-1">
								<div className="flex gap-x-1">
									<span>Создано -</span>
									<span>
										{format(new Date(order.createdAt), "dd MMM yyyy")}
									</span>
								</div>
								<div className="flex gap-x-1">
									<span>Обновлено -</span>
									<span>
										{format(new Date(order.updatedAt), "dd MMM yyyy")}
									</span>
								</div>
							</div>
						) : (
							<span>{format(new Date(order.createdAt), "dd MMM yyyy")}</span>
						)}
					</div>
				</div>
				<Badge
					className={cn(
						"px-3 py-1.5 text-sm font-medium rounded-full",
						status.className,
					)}
				>
					{status.icon}
					<span className="ml-1">{status.label}</span>
				</Badge>
			</CardHeader>

			<CardContent className="flex items-center justify-between gap-6 py-5 px-6 flex-wrap">
				<div className="flex items-center gap-4 ">
					<div className="relative w-20 h-20 overflow-hidden rounded-xl border bg-muted flex items-center justify-center">
						{order.preview.imageUrL ? (
							<img
								src={order.preview.imageUrL}
								alt="Product preview"
								className="object-cover w-full h-full"
							/>
						) : (
							<ShoppingBag className="text-muted-foreground" size={22} />
						)}
					</div>

					<div className="flex flex-col justify-center">
						<div className="text-sm text-muted-foreground mb-1">
							{pluralize(
								order.preview.orderItemCount,
								"товар",
								"товара",
								"товаров",
							)}
						</div>

						<div className="mt-2">
							<div className="flex items-center gap-2 mb-1">
								<MapPin size={14} className="text-primary" />
								<span className="text-xs uppercase tracking-wide text-muted-foreground">
									Адрес доставки
								</span>
							</div>
							<div className="text-sm text-foreground leading-snug ml-[22px]">
								{order.deliveryAddressCity}, {order.deliveryAddressStreet}, д.{" "}
								{order.deliveryAddressHome}
								{order.deliveryAddressApartment
									? `, кв. ${order.deliveryAddressApartment}`
									: ""}
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<div className="text-lg font-semibold whitespace-nowrap">
						{order.total.toLocaleString()} {order.currency}
					</div>
					<Button
						variant="outline"
						size="sm"
						className="group-hover:border-primary group-hover:text-primary transition cursor-pointer"
					>
						Подробнее <ArrowRight size={16} className="ml-1" />
					</Button>
				</div>
			</CardContent>

			{role === "admin" && (
				<div className="border-t border-border/50 pt-4 text-sm text-muted-foreground px-6">
					<div className="flex flex-col gap-1">
						<div>
							<span className="font-medium text-foreground">ID:</span>
							{order.id}
						</div>
						<div>
							<span className="font-medium text-foreground">
								Пользователь ID:
							</span>
							{order.userId}
						</div>
						<div>
							<span className="font-medium text-foreground">Промокод ID:</span>
							{order.promocode?.id ?? "—"}
						</div>
						<div>
							<span className="font-medium text-foreground">Имя:</span>
							{order.name}
						</div>
						<div>
							<span className="font-medium text-foreground">Email:</span>
							{order.email}
						</div>
						<div>
							<span className="font-medium text-foreground">Телефон:</span>
							{order.phoneNumber}
						</div>
					</div>
				</div>
			)}

			{order.promocode && (
				<CardFooter className="border-t bg-muted/10 px-6 py-3 flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
					<TicketPercent size={16} className="text-primary" />
					<span>Промокод:</span>
					<Badge
						variant="secondary"
						className="flex items-center flex-wrap gap-1 border border-orange-400/40 bg-orange-50 text-orange-700 font-medium px-3 py-1.5 rounded-full"
					>
						<span className="font-semibold break-words">
							{order.promocode.code}
						</span>
						{order.promocode.discountValue && (
							<span className="ml-1 text-orange-600">
								–{order.promocode.discountValue}&nbsp;
								{order.promocode.type === "percent" ? "%" : order.currency}
							</span>
						)}
					</Badge>
				</CardFooter>
			)}
		</Card>
	);
};

function getStatusData(status: TOrder["status"]) {
	switch (status) {
		case "delivered":
			return {
				label: "Доставлен",
				className: "bg-green-100 text-green-700",
				icon: <Package size={14} />,
			};
		case "paid":
			return {
				label: "Оплачен",
				className: "bg-blue-100 text-blue-700",
				icon: <Package size={14} />,
			};
		case "pending":
			return {
				label: "В ожидании",
				className: "bg-yellow-100 text-yellow-800",
				icon: <Package size={14} />,
			};
		case "shipped":
			return {
				label: "В пути",
				className: "bg-sky-100 text-sky-800",
				icon: <Package size={14} />,
			};
		case "cancelled":
			return {
				label: "Отменён",
				className: "bg-red-100 text-red-700",
				icon: <Package size={14} />,
			};
		default:
			return {
				label: status,
				className: "bg-gray-100 text-gray-700",
				icon: <Package size={14} />,
			};
	}
}

function pluralize(count: number, one: string, few: string, many: string) {
	const mod10 = count % 10;
	const mod100 = count % 100;
	if (mod10 === 1 && mod100 !== 11) return `${count} ${one}`;
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
		return `${count} ${few}`;
	return `${count} ${many}`;
}
