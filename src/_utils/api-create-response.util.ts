import { Response } from "express";
import { ApiResponse } from "@src/_types/api-response.type";

export function apiCreateResponseUtil(data: ApiResponse, res: Response) {
  if (!data.data) {
    data.data = {};
  }

  res.status(data.errors.length ? 400 : 200).send(data);
}