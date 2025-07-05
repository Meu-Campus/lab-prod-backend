import { Controller, Response, Request, Post, Get, Put } from "@src/server/routing";
import { UserModuleService } from "@src/module/user-module/user-module.service";
import { apiCreateResponseUtil } from "@src/_utils/api-create-response.util";
import { validationBodyMiddleware } from "@src/middleware/validation-body.middleware";
import {
	userCreateApiSchema,
	userLoginApiSchema, userPasswordResetApiSchema,
	userRecoverApiSchema
} from "@src/module/user-module/user-module.schema";
import { multerUpload } from "@src/multer";

export class UserModuleController extends Controller {
	@Post("/user", [validationBodyMiddleware(userCreateApiSchema)], true)
	async create(req: Request, res: Response) {
		const service = new UserModuleService();
		const result = await service.create(req.body);
		return apiCreateResponseUtil(result, res);
	}

	@Post("/user/login", [validationBodyMiddleware(userLoginApiSchema)], true)
	async login(req: Request, res: Response) {
		const service = new UserModuleService();
		const result = await service.login(req.body);
		return apiCreateResponseUtil(result, res);
	}

	@Post("/user/recovery-link", [validationBodyMiddleware(userRecoverApiSchema)], true)
	async sendRecoveryLink(req: Request, res: Response) {
		const service = new UserModuleService();
		const result = await service.sendRecoverPasswordLink(req.body);
		return apiCreateResponseUtil(result, res);
	}

	@Post("/user/reset-password", [validationBodyMiddleware(userPasswordResetApiSchema)], true)
	async resetPassword(req: Request, res: Response) {
		const service = new UserModuleService();
		const result = await service.resetPassword(req.body);
		return apiCreateResponseUtil(result, res);
	}

	@Get("/user/me")
	async getMeInfo(req: Request, res: Response) {
		return apiCreateResponseUtil({
			data: res.locals["userData"],
			errors: [],
			message: ""
		}, res);
	}

	@Put("/user/me", [multerUpload.single("image")])
	async updateMe(req: Request, res: Response) {
		const service = new UserModuleService();
		const result = await service.updateMe(res.locals["userData"]._id, req.body, req.file);
		return apiCreateResponseUtil(result, res);
	}
}