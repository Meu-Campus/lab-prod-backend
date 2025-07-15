import {
	createModel,
	SchemaDef
} from "@src/server/mongo";
import { TaskEntity } from "./task-module.entity";

export const taskModuleSchema: SchemaDef = {
	name: {
		type: String,
		required: true,
		text: true
	},
	userId: {
		type: String,
		required: true
	}
};

export const taskModuleModel =
	createModel<TaskEntity>(
		"taskModuleModel",
		taskModuleSchema,
		"task"
	);
