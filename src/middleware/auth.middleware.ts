import { NextFunction, Request, Response } from "express";
import { environment } from "@src/environment";
import jwt from "jsonwebtoken";
import { userModuleModel } from "@src/module/user-module/user-module.model";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).send({ message: "Not Authenticated 1" });
    return
  }

  const token = authHeader.split(' ')[1];

  try {
    const key = environment.tokenSecret;
    const decoded = jwt.verify(token, key) as any;

    res.locals["userData"] = await userModuleModel.findOne({
      email: decoded.email
    }).select("-password").exec();

    next();
  } catch (error) {
    res.status(401).send({ message: "Not Authenticated 2" });
    return
  }
};