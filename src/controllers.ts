import { Controller } from "./server/routing";
import { UserModuleController } from "./module/user-module/user-module.controller";
import { SubjectModuleController } from "@src/module/subject-module/subject-module.controller";

export const controllers: Controller[  ] = [
	new UserModuleController(),
	new SubjectModuleController()
];