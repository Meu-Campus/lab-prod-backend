import { BaseModel } from "@src/server/mongo";

export class SubjectEntity extends BaseModel {
	name!: string;
	userId!: string;
	description!: string;
}
