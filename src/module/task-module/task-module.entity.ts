import { BaseModel } from "@src/server/mongo";

export class TaskEntity extends BaseModel {
	name!: string;
	userId!: string;
}
