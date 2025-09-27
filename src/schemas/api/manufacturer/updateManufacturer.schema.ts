import z from "zod";
import { createManufacturerSchema } from "./createManufacturer.schema";

export const updateManufacturerSchema = createManufacturerSchema
	.partial()
	.extend({
		manufacturerId: z.number().positive(),
	});

export type UpdateManufacturerSchema = z.Infer<typeof updateManufacturerSchema>;
