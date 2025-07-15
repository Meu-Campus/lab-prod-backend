import { Controller } from "./server/routing";
import { UserModuleController } from "./module/user-module/user-module.controller";
import { SubjectModuleController } from "@src/module/subject-module/subject-module.controller";
import { TeacherModuleController } from "@src/module/teacher-module/teacher-module.controller";
import { TaskModuleController } from "@src/module/task-module/task-module.controller";
import { ClasseModuleController } from "@src/module/classe-module/classe-module.controller";

export const controllers: Controller[  ] = [
	new UserModuleController(),
	new SubjectModuleController(),
	new TeacherModuleController(),
	new TaskModuleController(),
	new ClasseModuleController()
];