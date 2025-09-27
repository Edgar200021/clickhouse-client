import z from "zod";

export const removeProductAssemblyInstructionSchema = z.object({
	productId: z.number().positive(),
	fileId: z.string().trim().nonempty(),
});

export type RemoveProductAssemblyInstructionSchema = z.Infer<
	typeof removeProductAssemblyInstructionSchema
>;
