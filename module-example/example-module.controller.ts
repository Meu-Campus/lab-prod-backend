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

export class ExampleModuleController extends Controller {
	@Post("/subject")
	async create(req: Request, res: Response) {
		const service = new SubjectModuleService();
		const result = await service.create({
			...req.body,
			userId: res.locals["userData"]._id
		});
		return apiCreateResponseUtil(result, res);
	}

	@Put("/subject")
	async update(req: Request, res: Response) {
		const service = new SubjectModuleService();
		const { id } = req.query;
		const result = await service.update(id as string, req.body);
		return apiCreateResponseUtil(result, res);
	}

	@Get("/subject")
	async get(req: Request, res: Response) {
		const service = new SubjectModuleService();
		const { page, perPage, ...query } = req.query;
		const result = await service.getPaginated(
			Number(page) ?? 1,
			Number(perPage) ?? 10,
			query
		);
		return apiCreateResponseUtil(result, res);
	}

	@Delete("/subject")
	async delete(req: Request, res: Response) {
		const service = new SubjectModuleService();
		const { id } = req.query;
		const result = await service.delete(id as string);
		return apiCreateResponseUtil(result, res);
	}
}
