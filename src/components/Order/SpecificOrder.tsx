import { CreditCard, MapPin, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	OrderStatus,
	type SpecificOrder as TSpecificOrder,
} from "@/types/order";

interface Props {
	className?: string;
	order: TSpecificOrder;
}

const statusStyles: Record<string, string> = {
	pending: "bg-yellow-100 text-yellow-800",
	paid: "bg-green-100 text-green-800",
	shipped: "bg-sky-100 text-sky-800",
	delivered: "bg-indigo-100 text-indigo-800",
	cancelled: "bg-rose-100 text-rose-800",
};

const statusLabels: Record<string, string> = {
	pending: "Ожидает оплаты",
	paid: "Оплачен",
	shipped: "Отправлен",
	delivered: "Доставлен",
	cancelled: "Отменён",
};

const formatCurrency = (currency: string, value: number) =>
	`${currency} ${value.toFixed(2)}`;

const Timer = ({
	createdAt,
	paymentTimeoutInMinutes,
	status,
	onTimeExpire,
}: Pick<Props["order"], "paymentTimeoutInMinutes" | "createdAt" | "status"> & {
	onTimeExpire: (val: boolean) => void;
}) => {
	const [timeLeft, setTimeLeft] = useState<number>(() => {
		const created = new Date(createdAt).getTime();
		const deadline = created + paymentTimeoutInMinutes * 60 * 1000;
		return Math.max(0, deadline - Date.now());
	});

	useEffect(() => {
		if (timeLeft <= 0) {
			onTimeExpire(true);
			return;
		}

		const interval = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1000) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1000;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [timeLeft, onTimeExpire]);

	const minutes = Math.floor(timeLeft / 60000);
	const seconds = Math.floor((timeLeft % 60000) / 1000);

	if (status !== OrderStatus.Pending) return null;

	if (timeLeft <= 0) {
		return (
			<div className="text-sm text-rose-500 font-semibold">
				Время на оплату заказа истекло
			</div>
		);
	}

	return (
		<div className="text-sm text-rose-500 font-semibold">
			До отмены заказа осталось {minutes}:{seconds.toString().padStart(2, "0")}
		</div>
	);
};

export const SpecificOrder = ({ className, order }: Props) => {
	const [isTimeExpired, setIsTimeExpired] = useState(false);

	const subtotal = order.orderItems.reduce(
		(s, it) => s + it.price * it.quantity,
		0,
	);

	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg",
				className,
			)}
		>
			<section className="md:col-span-2">
				<div className="flex items-start justify-between mb-4">
					<h2 id={`order-${order.number}`} className="text-lg font-semibold">
						Заказ №{order.number}
					</h2>

					<span
						className={cn(
							"inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full",
							statusStyles[order.status] ?? "bg-gray-100 text-gray-800",
						)}
						aria-live="polite"
					>
						<span className="capitalize">
							{statusLabels[order.status] ?? order.status}
						</span>
					</span>
				</div>

				<ul className="space-y-4">
					{order.orderItems.map((item, idx) => (
						<li
							key={idx}
							className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 grid place-items-center">
								<img
									src={item.image}
									alt={item.name}
									className="object-cover w-full h-full"
								/>
							</div>

							<div className="flex-1 min-w-0">
								<p className="font-medium truncate">{item.name}</p>
								<p className="text-sm text-muted-foreground">
									Количество:{" "}
									<span className="font-medium">{item.quantity}</span>
								</p>
								<div className="mt-2 flex items-center gap-2 text-sm">
									<span className="text-muted-foreground">
										Цена за единицу:
									</span>
									<span className="font-medium">
										{formatCurrency(order.currency, item.price)}
									</span>
								</div>
							</div>

							<div className="text-right min-w-[90px]">
								<div className="text-sm text-muted-foreground">Сумма</div>
								<div className="font-semibold">
									{formatCurrency(order.currency, item.price * item.quantity)}
								</div>
							</div>
						</li>
					))}
				</ul>

				<div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
					<div className="text-sm text-muted-foreground">
						Создан:
						<time dateTime={order.createdAt}>
							{new Date(order.createdAt).toLocaleString()}
						</time>
					</div>

					<div className="flex items-center gap-3">
						<div className="text-sm">
							<div className="text-xs text-muted-foreground">
								Промежуточный итог
							</div>
							<div className="font-semibold">
								{formatCurrency(order.currency, subtotal)}
							</div>
						</div>
					</div>
				</div>
				{order.promocode && (
					<div className="text-sm flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-50 to-white rounded-xl shadow-sm w-fit">
						<Tag className="w-4 h-4" />
						<div>
							<div className="text-xs text-muted-foreground">Промокод</div>
							<div className="font-medium">{order.promocode.code}</div>
							<div className="text-xs text-muted-foreground">
								{order.promocode.type === "percent"
									? `Скидка ${order.promocode.discountValue}%`
									: `Скидка ${formatCurrency(
											order.currency,
											Number(order.promocode.discountValue),
										)}`}
							</div>
						</div>
						<div className="ml-2 text-sm text-rose-600 font-semibold">
							-
							{order.promocode.type === "percent"
								? `${order.promocode.discountValue}%`
								: formatCurrency(
										order.currency,
										Number(order.promocode.discountValue),
									)}
						</div>
					</div>
				)}
			</section>

			<aside className="space-y-4">
				<Card>
					<CardHeader>
						<CardTitle>Сводка</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex justify-between text-sm text-muted-foreground">
							<span>Промежуточный итог</span>
							<span>{formatCurrency(order.currency, subtotal)}</span>
						</div>

						{order.promocode && (
							<div className="flex justify-between text-sm text-rose-600">
								<span>Скидка</span>
								<span>
									{order.promocode.type === "percent"
										? `-${order.promocode.discountValue}%`
										: `-${formatCurrency(order.currency, Number(order.promocode.discountValue))}`}
								</span>
							</div>
						)}

						<div className="border-t pt-3 flex justify-between items-baseline">
							<div className="text-sm text-muted-foreground">Итого</div>
							<div className="text-lg font-semibold">
								{formatCurrency(order.currency, order.total)}
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Доставка</CardTitle>
					</CardHeader>
					<CardContent className="flex items-start gap-3">
						<MapPin className="w-5 h-5 text-muted-foreground" />
						<div className="text-sm">
							<div className="font-medium">{order.deliveryAddressCity}</div>
							<div className="text-muted-foreground">
								{order.deliveryAddressStreet} {order.deliveryAddressHome}, кв.{" "}
								{order.deliveryAddressApartment}
							</div>
							<div className="mt-2 text-xs text-muted-foreground">
								Телефон: {order.phoneNumber}
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-2">
					<Timer
						createdAt={order.createdAt}
						paymentTimeoutInMinutes={order.paymentTimeoutInMinutes}
						status={order.status}
						onTimeExpire={setIsTimeExpired}
					/>
					<Button
						className="w-full flex items-center justify-center gap-2 bg-orange-400 cursor-pointer py-5 rounded-3xl hover:bg-orange-500"
						disabled={order.status !== "pending" || isTimeExpired}
						aria-disabled={order.status !== "pending"}
					>
						<CreditCard className="w-4 h-4" />
						{order.status === "pending" ? "Оплатить" : "Оплата недоступна"}
					</Button>

					<button
						className="w-full text-sm underline text-muted-foreground"
						type="button"
						onClick={() => {
							void 0;
						}}
					>
						Скачать счёт
					</button>
				</div>
			</aside>
		</div>
	);
};
