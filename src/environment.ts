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
  bucketName: process.env.BUCKET_NAME ?? '',
  awsRegion: process.env.AWS_REGION ?? 'us-east-1',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
  awsR2Endpoint: process.env.AWS_R2_ENDPOINT ?? '',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  publicImageDevUrl: process.env.PUBLIC_IMAGE_DEV_URL
}