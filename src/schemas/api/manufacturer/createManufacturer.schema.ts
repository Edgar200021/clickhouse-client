import z from "zod";
import { ManufacturerNameMaxLength } from "@/const/schema";

export const createManufacturerSchema = z.object({
	name: z.string().nonempty().max(ManufacturerNameMaxLength),
});

export type CreateManufacturerSchema = z.Infer<typeof createManufacturerSchema>;
