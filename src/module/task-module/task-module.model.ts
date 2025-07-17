import {
	createModel,
	SchemaDef
} from "@src/server/mongo";
import { TaskEntity } from "./task-module.entity";

export const taskModuleSchema: SchemaDef = {
	description: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	dueDate: {
		type: Date,
		required: true
	},
	subjectId: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
		text: true
	},
	isDelivered: {
		type: Boolean,
		default: false
	}
};

export const taskModuleModel =
	createModel<TaskEntity>(
		"taskModuleModel",
		taskModuleSchema,
		"task"
	);
