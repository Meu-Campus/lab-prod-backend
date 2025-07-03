import * as process from "node:process";

export const environment = {
  port: parseInt(process.env.PORT ?? "4000"),
  host: process.env.HOST ?? 'localhost',
  mongoUri: process.env.MONGO_URI ?? '',
  mongoDb: process.env.MONGO_DB ?? 'test',
  apiKey: process.env.API_KEY ?? '',
  tokenSecret: process.env.TOKEN_SECRET ?? '',
  bcryptSalt: parseInt(process.env.BCRYPT_SALT ?? '10'),
}