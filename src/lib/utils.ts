import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Promocode } from "@/types/promocode";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function calculateDiscount(price: number, salePrice: number) {
	return Math.round(((price - salePrice) / price) * 100);
}

export function applyPromocode(amount: number, promocode: Promocode): number {
	let discount = 0;

	switch (promocode.type) {
		case "fixed":
			discount = Number(promocode.discountValue);
			break;
		case "percent":
			discount = (amount * Number(promocode.discountValue)) / 100;
			break;
	}

	return Math.max(amount - discount, 0);
}

export const getTimezoneOffset = () =>
	Math.abs(new Date().getTimezoneOffset() / 60);
