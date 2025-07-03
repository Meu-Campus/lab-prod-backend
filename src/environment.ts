import * as process from "node:process";

export const environment = {
  port: parseInt(process.env.PORT ?? "4000"),
  host: process.env.HOST ?? 'localhost',
  mongoUri: process.env.MONGO_URI ?? '',
  mongoDb: process.env.MONGO_DB ?? 'test',
  apiKey: process.env.API_KEY ?? '',
  tokenSecret: process.env.TOKEN_SECRET ?? '',
  bcryptSalt: parseInt(process.env.BCRYPT_SALT ?? '10'),
  smtpHost: process.env.SMTP_HOST ?? '',
  smtpPort: parseInt(process.env.SMTP_PORT ?? '587'),
  smtpEmail: process.env.SMTP_EMAIL ?? '',
  smtpPassword: process.env.SMTP_PASSWORD ?? '',
  frontEndUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
}