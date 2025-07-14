import { BaseModel } from "@src/server/mongo";

export class TeacherEntity extends BaseModel {
	name!: string;
	userId!: string;
}
