import { z } from "zod/v4";

export const userCreateApiSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});