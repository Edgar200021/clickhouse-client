import z from "zod";

export const addCartPromocdeSchema = z.object({
	promocode: z.string().trim().nonempty(),
});

export type AddCartPromocodeSchema = z.Infer<typeof addCartPromocdeSchema>;
