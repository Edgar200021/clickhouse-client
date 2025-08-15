import z from "zod";

export const blockToggleSchema = z.object({
	userId: z.uuid(),
	type: z.enum(["lock", "unlock"]),
});

export type BlockToggleSchema = z.infer<typeof blockToggleSchema>;
