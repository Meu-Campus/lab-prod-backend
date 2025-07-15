import {
	createModel,
	SchemaDef
} from "@src/server/mongo";
import { TeacherEntity } from "./teacher-module.entity";

export const teacherModuleSchema: SchemaDef = {
	name: {
		type: String,
		required: true,
		text: true
	},
	userId: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
};

export const teacherModuleModel =
	createModel<TeacherEntity>(
		"teacherModuleModel",
		teacherModuleSchema,
		"teacher"
	);
