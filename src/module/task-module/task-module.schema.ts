import { z } from "zod";

export const createTaskSchema = z.object({
	name: z.string().min(1),
	userId: z.string().uuid(),
});
