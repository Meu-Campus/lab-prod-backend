import { BaseModel } from "@src/server/mongo";

export class ClasseEntity extends BaseModel {
	name!: string;
	userId!: string;
}
