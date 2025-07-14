import {
	createModel,
	SchemaDef,
} from "@src/server/mongo";
import { SubJectEntity as SubjectEntity } from "./teacher-module.entity";

export const subjectModuleSchema: SchemaDef = {
	name: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
};

export const teacherModuleModel =
	createModel<SubjectEntity>(
		"teacherModuleModel",
		subjectModuleSchema,
		"subject"
	);
