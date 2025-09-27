import z from "zod";
import { PromocodeType } from "@/types/promocode";
import { createPromocodeSchema } from "./createPromocode.schema";

export const updatePromocodeSchema = createPromocodeSchema
	.partial()
	.extend({
		promocodeId: z.number().positive(),
	})
	.refine(
		(obj) => {
			if (obj.type && obj.discountValue && obj.type === PromocodeType.Percent)
				return obj.discountValue < 100;

			return true;
		},
		{
			error: "Значение скидки должно быть меньше 100 для процентных промокодов",
			path: ["discountValue"],
		},
	)
	.refine(
		(obj) =>
			obj.validTo && obj.validFrom
				? new Date(obj.validTo).getTime() > new Date(obj.validFrom).getTime()
				: true,
		{
			error: "Дата окончания должна быть больше даты начала",
			path: ["validTo"],
		},
	)
	.refine(
		(obj) =>
			obj.validTo ? new Date(obj.validTo).getTime() > Date.now() : true,
		{
			error: "Дата окончания должна быть больше текущей даты",
			path: ["validTo"],
		},
	);

export type UpdatePromocodeSchema = z.Infer<typeof updatePromocodeSchema>;
