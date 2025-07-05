import { createModel, SchemaDef } from "@src/server/mongo";
import { UserModuleEntity } from "@src/module/user-module/user-module.entity";

const userModuleSchema: SchemaDef = {
	name: {
		type: String,
		required: true,
		index: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		default: null
	}
};

export const userModuleModel = createModel<UserModuleEntity>("user", userModuleSchema, "user");

