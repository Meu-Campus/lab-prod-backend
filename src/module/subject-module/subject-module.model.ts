import {
	createModel,
	SchemaDef,
} from "@src/server/mongo";
import { SubJectEntity as SubjectEntity } from "./subject-module.entity";

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

export const subjectModuleModel =
	createModel<SubjectEntity>(
		"subjectModuleModel",
		subjectModuleSchema,
		"subject"
	);
