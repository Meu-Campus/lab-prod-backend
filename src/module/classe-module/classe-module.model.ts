import {
	createModel,
	SchemaDef,
} from "@src/server/mongo";
import { ClasseEntity } from "./classe-module.entity";

export const classeModuleSchema: SchemaDef = {
	endTime: {
		type: Date,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	room: {
		type: String,
		required: true,
	},
	startTime: {
		type: Date,
		required: true,
	},
	subjectId: {
		type: String,
		required: true,
	},
	teacherId: {
		type: String,
		required: true,
	},
};

export const classeModuleModel =
	createModel<ClasseEntity>(
		"classeModuleModel",
		classeModuleSchema,
		"classe"
	);
