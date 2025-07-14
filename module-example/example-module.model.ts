import {
	createModel,
	SchemaDef,
} from "@src/server/mongo";
import { SubJectEntity as SubjectEntity } from "./example-module.entity";

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

export const exampleModuleModel =
	createModel<SubjectEntity>(
		"exampleModuleModel",
		subjectModuleSchema,
		"subject"
	);
