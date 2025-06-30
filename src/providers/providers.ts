import { MongooseProvider } from "./mongoose/mongoose.provider";

export const providers: IProvider[] = [
  new MongooseProvider()
]