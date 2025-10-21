import { Currency } from "@/types/currency.enum";

export const Currencies: Record<Currency, string> = {
	[Currency.Rub]: "₽",
	[Currency.Usd]: "$",
	[Currency.Eur]: "€",
};
