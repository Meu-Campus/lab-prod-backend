import { z } from "zod/v4";

export const userCreateApiSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});

export const userLoginApiSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const userRecoverApiSchema = z.object({
  email: z.email(),
});

export const userPasswordResetApiSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  token: z.string().min(1),
});