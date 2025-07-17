import {
	createModel,
	SchemaDef
} from "@src/server/mongo";
import { ClasseEntity } from "./classe-module.entity";

export const classeModuleSchema: SchemaDef = {
	userId: {
		type: String,
		required: true
	},
	room: {
		type: String,
		required: true,
		text: true
	},
	startTime: {
		type: String,
		default: null
	},
	subjectId: {
		type: String,
		required: true
	},
	teacherId: {
		type: String,
		required: true
	},
	isRecurring: {
		type: Boolean,
		default: false
	},
	dayOfWeek: {
		type: Number,
		default: null
	},
	date: {
		type: Date,
		default: null
	}
};

export const classeModuleModel =
	createModel<ClasseEntity>(
		"classeModuleModel",
		classeModuleSchema,
		"classe"
	);
