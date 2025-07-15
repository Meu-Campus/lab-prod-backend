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
import { SubjectModuleService } from "@src/module/subject-module/subject-module.service";
import { formatQueryUtil } from "@src/_utils/format-query.util";

export class SubjectModuleController extends Controller {
	@Post("/subjects")
	async create(req: Request, res: Response) {
		const service = new SubjectModuleService();
		const result = await service.create({
			...req.body,
			userId: res.locals["userData"]._id
		});
		return apiCreateResponseUtil(result, res);
	}

	@Put("/subjects")
	async update(req: Request, res: Response) {
		const service = new SubjectModuleService();
		const { id } = req.query;
		const result = await service.update(id as string, req.body);
		return apiCreateResponseUtil(result, res);
	}

	@Get("/subjects")
	async get(req: Request, res: Response) {
		const service = new SubjectModuleService();
		let { page, perPage, ...query } = req.query;

		query = formatQueryUtil(query);

		const result = await service.getPaginated(
			Number(page) ?? 1,
			Number(perPage) ?? 10,
			query
		);
		return apiCreateResponseUtil(result, res);
	}

	@Delete("/subjects")
	async delete(req: Request, res: Response) {
		const service = new SubjectModuleService();
		const { id } = req.query;
		const result = await service.delete(id as string);
		return apiCreateResponseUtil(result, res);
	}

	@Get("/subjects/all")
	async getAll(req: Request, res: Response) {
		const service = new SubjectModuleService();
		const result = await service.all();
		return apiCreateResponseUtil(result, res);
	}
}
