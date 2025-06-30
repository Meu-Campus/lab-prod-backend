import * as mongoose from "mongoose";
import { environment } from "@src/environment";
import { logger } from "io-logger";

export class MongooseProvider implements IProvider {
  name: string = 'MongooseProvider';

  async execute(): Promise<any> {
    try {
      await mongoose.connect(environment.mongoUri, {
        autoIndex: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      });
    } catch (error: any) {
      logger.error(error);
    }
  }
}