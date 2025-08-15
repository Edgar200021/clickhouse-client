import z from "zod";

export const updateManufacturerSchema = z.object({
	manufacturerId: z.number().positive(),
	name: z.string().nonempty(),
});

export type UpdateManufacturerSchema = z.infer<typeof updateManufacturerSchema>;
