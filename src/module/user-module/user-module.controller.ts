import { Controller, Response, Request, Post } from "@src/server/routing";
import { UserModuleService } from "@src/module/user-module/user-module.service";
import { apiCreateResponseUtil } from "@src/_utils/api-create-response.util";
import { validationBodyMiddleware } from "@src/middleware/validation-body.middleware";
import {
  userCreateApiSchema,
  userLoginApiSchema, userPasswordResetApiSchema,
  userRecoverApiSchema
} from "@src/module/user-module/user-module.schema";

export class UserModuleController extends Controller {
  @Post("/user", [validationBodyMiddleware(userCreateApiSchema)])
  async create(req: Request, res: Response) {
    const service = new UserModuleService();
    const result = await service.create(req.body);
    return apiCreateResponseUtil(result, res);
  }

  @Post("/user/login", [validationBodyMiddleware(userLoginApiSchema)])
  async login(req: Request, res: Response) {
    const service = new UserModuleService();
    const result = await service.login(req.body);
    return apiCreateResponseUtil(result, res);
  }

  @Post("/user/recovery-link", [validationBodyMiddleware(userRecoverApiSchema)])
  async sendRecoveryLink(req: Request, res: Response) {
    const service = new UserModuleService();
    const result = await service.sendRecoverPasswordLink(req.body);
    return apiCreateResponseUtil(result, res);
  }

  @Post("/user/reset-password", [validationBodyMiddleware(userPasswordResetApiSchema)])
  async resetPassword(req: Request, res: Response) {
    const service = new UserModuleService();
    const result = await service.resetPassword(req.body);
    return apiCreateResponseUtil(result, res);
  }
}