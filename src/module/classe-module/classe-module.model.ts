import {
	createModel,
	SchemaDef,
} from "@src/server/mongo";
import { ClasseEntity } from "./classe-module.entity";

export const classeModuleSchema: SchemaDef = {
	name: {
		type: String,
		required: true,
	},
	userId: {
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
