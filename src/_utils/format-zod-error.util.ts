import { ZodError } from "zod";

export function formatZodErrorUtil(data: ZodError): string[] {
  return data.errors.map(err => `${err.message} ${err.path}`);
}