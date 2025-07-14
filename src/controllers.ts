import { Controller } from "./server/routing";
import { UserModuleController } from "./module/user-module/user-module.controller";
import { SubjectModuleController } from "@src/module/subject-module/subject-module.controller";
import { TeacherModuleController } from "@src/module/teacher-module/teacher-module.controller";

export const controllers: Controller[  ] = [
	new UserModuleController(),
	new SubjectModuleController(),
	new TeacherModuleController()
];