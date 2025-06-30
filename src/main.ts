import { logger } from "io-logger";
import express from "express";
import { environment } from "./environment";
import cors from "cors";

const main = async () => {
  logger.info('Starting the application...');
  const server = express();

  server.use(express.json());
  server.use(cors());

  server.listen(environment.port, environment.host, () => {
    logger.info(`Server is running on http://${environment.host}:${environment.port}`);
  });
}

main();