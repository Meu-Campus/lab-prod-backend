import { NextFunction, Request, Response } from "express";
import { environment } from "@src/environment";

export const apiMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['x-api-key'] && req.headers['x-api-key'] === environment.apiKey) {
    next();
    return;
  }

  res.status(401).send({ message: "Not Authenticated" });
}