import z from "zod";

export const createManufacturerSchema = z.object({
	name: z.string().nonempty(),
});

export type CreateManufacturerSchema = z.infer<typeof createManufacturerSchema>;
