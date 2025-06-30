import { Controller } from "./server/routing";
import { UserModuleController } from "./module/user-module/user-module.controller";

export const controllers: Controller[  ] = [
  new UserModuleController()
]