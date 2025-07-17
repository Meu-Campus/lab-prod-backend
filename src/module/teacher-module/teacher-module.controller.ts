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
import { formatQueryUtil } from "@src/_utils/format-query.util";

export class TeacherModuleController extends Controller {
	@Post("/teachers")
	async create(req: Request, res: Response) {
		const service = new TeacherModuleService();
		const result = await service.create({
			...req.body,
			userId: res.locals["userData"]._id
		});
		return apiCreateResponseUtil(result, res);
	}

	@Put("/teachers")
	async update(req: Request, res: Response) {
		const service = new TeacherModuleService();
		const { id } = req.query;
		const result = await service.update(id as string, req.body, res.locals["userData"]._id);
		return apiCreateResponseUtil(result, res);
	}

	@Get("/teachers")
	async get(req: Request, res: Response) {
		const service = new TeacherModuleService();
		let { page, perPage, ...query } = req.query;

		query = formatQueryUtil({ ...query, userId: res.locals["userData"]._id });

		const result = await service.getPaginated(
			Number(page) ?? 1,
			Number(perPage) ?? 10,
			query
		);
		return apiCreateResponseUtil(result, res);
	}

	@Delete("/teachers")
	async delete(req: Request, res: Response) {
		const service = new TeacherModuleService();
		const { id } = req.query;
		const result = await service.delete(id as string, res.locals["userData"]._id);
		return apiCreateResponseUtil(result, res);
	}

	@Get("/teachers/all")
	async getAll(req: Request, res: Response) {
		const service = new TeacherModuleService();
		const result = await service.all(res.locals["userData"]._id);
		return apiCreateResponseUtil(result, res);
	}
}
