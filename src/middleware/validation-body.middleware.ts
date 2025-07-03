import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodIssue } from "zod/v4";

export const validationBodyMiddleware = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).send({
          message: "Erro de validação",
          errors: error.issues.map((issue: any) => {
            return {
              key: issue.path.join('.'),
              message: issue.message,
            }
          }),
        });
        return
      }

      res.status(400).send({});
    }
  };
};
