import z from "zod";
import { Currency } from "@/types/currency.enum.js";
import {
	CreateOrderMaxApartmentLength,
	CreateOrderMaxCityLength,
	CreateOrderMaxHomeLength,
	CreateOrderMaxStreetLength,
	CreateOrderNameMaxLength,
} from "../../../const/schema.js";

const AddressSchema = z.object({
	city: z.string().trim().nonempty().max(CreateOrderMaxCityLength),
	street: z.string().trim().nonempty().max(CreateOrderMaxStreetLength),
	home: z.string().trim().nonempty().max(CreateOrderMaxHomeLength),
	apartment: z.string().trim().nonempty().max(CreateOrderMaxApartmentLength),
});

export const createOrderSchema = z.object({
	currency: z.enum(Currency),
	phoneNumber: z.e164(),
	email: z.email(),
	name: z.string().trim().nonempty().max(CreateOrderNameMaxLength),
	billingAddress: AddressSchema,
	deliveryAddress: AddressSchema,
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;
