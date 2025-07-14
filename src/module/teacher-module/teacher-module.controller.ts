import {
	Controller,
	Post,
	Response,
	Request,
	Put,
	Get,
	Delete
} from "@src/server/routing";
import { apiCreateResponseUtil } from "@src/_utils/api-create-response.util";
import { TeacherModuleService } from "@src/module/teacher-module/teacher-module.service";

export class TeacherModuleController extends Controller {
	@Post("/teacher")
	async create(req: Request, res: Response) {
		const service = new TeacherModuleService();
		const result = await service.create({
			...req.body,
			userId: res.locals["userData"]._id
		});
		return apiCreateResponseUtil(result, res);
	}

	@Put("/teacher")
	async update(req: Request, res: Response) {
		const service = new TeacherModuleService();
		const { id } = req.query;
		const result = await service.update(id as string, req.body);
		return apiCreateResponseUtil(result, res);
	}

	@Get("/teacher")
	async get(req: Request, res: Response) {
		const service = new TeacherModuleService();
		const { page, perPage, ...query } = req.query;
		const result = await service.getPaginated(
			Number(page) ?? 1,
			Number(perPage) ?? 10,
			query
		);
		return apiCreateResponseUtil(result, res);
	}

	@Delete("/teacher")
	async delete(req: Request, res: Response) {
		const service = new TeacherModuleService();
		const { id } = req.query;
		const result = await service.delete(id as string);
		return apiCreateResponseUtil(result, res);
	}
}
