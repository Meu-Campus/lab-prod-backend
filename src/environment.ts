import * as process from "node:process";

export const environment = {
  port: parseInt(process.env.PORT ?? "4000"),
  host: process.env.HOST ?? 'localhost',
}