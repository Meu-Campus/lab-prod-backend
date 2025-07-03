import { BaseModel } from "@src/server/mongo";

export class UserModuleEntity extends BaseModel {
  name!: string;
  email!: string;
  password!: string;
}