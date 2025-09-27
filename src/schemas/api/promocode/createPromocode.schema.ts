import z from "zod";
import { PromocodeType } from "@/types/promocode";

export const createPromocodeSchema = z
	.object({
		code: z.string().trim().nonempty(),
		type: z.enum(PromocodeType),
		discountValue: z.float32().positive(),
		usageLimit: z.number().positive(),
		validFrom: z.iso.datetime(),
		validTo: z.iso.datetime(),
	})
	.refine(
		(obj) => {
			if (obj.type === PromocodeType.Percent) return obj.discountValue < 100;

			return true;
		},
		{
			error: "Значение скидки должно быть меньше 100 для процентных промокодов",
			path: ["discountValue"],
		},
	)
	.refine(
		(obj) =>
			new Date(obj.validTo).getTime() > new Date(obj.validFrom).getTime(),
		{
			error: "Дата окончания должна быть больше даты начала",
			path: ["validTo"],
		},
	)
	.refine((obj) => new Date(obj.validTo).getTime() > Date.now(), {
		error: "Дата окончания должна быть больше текущей даты",
		path: ["validTo"],
	});

export type CreatePromocodeSchema = z.Infer<typeof createPromocodeSchema>;
