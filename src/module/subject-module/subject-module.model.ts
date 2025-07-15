import {
	createModel,
	SchemaDef
} from "@src/server/mongo";
import { SubjectEntity } from "./subject-module.entity";

export const subjectModuleSchema: SchemaDef = {
	name: {
		type: String,
		required: true,
		text: true
	},
	userId: {
		type: String,
		required: true
	},
	description: {
		type: String
	}
};

export const subjectModuleModel =
	createModel<SubjectEntity>(
		"subjectModuleModel",
		subjectModuleSchema,
		"subject"
	);
