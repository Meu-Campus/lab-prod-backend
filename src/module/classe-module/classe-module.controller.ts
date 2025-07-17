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
import { ClasseModuleService } from "@src/module/classe-module/classe-module.service";
import { formatQueryUtil } from "@src/_utils/format-query.util";

export class ClasseModuleController extends Controller {
	@Post("/classes")
	async create(req: Request, res: Response) {
		const service = new ClasseModuleService();
		const result = await service.create({
			...req.body,
			userId: res.locals["userData"]._id
		});
		return apiCreateResponseUtil(result, res);
	}

	@Put("/classes")
	async update(req: Request, res: Response) {
		const service = new ClasseModuleService();
		const { id } = req.query;
		const result = await service.update(id as string, req.body);
		return apiCreateResponseUtil(result, res);
	}

	@Get("/classes")
	async get(req: Request, res: Response) {
		const service = new ClasseModuleService();
		let { page, perPage, ...query } = req.query;

		query = formatQueryUtil(query);

		const result = await service.getPaginated(
			Number(page) ?? 1,
			Number(perPage) ?? 10,
			query
		);
		return apiCreateResponseUtil(result, res);
	}

	@Delete("/classes")
	async delete(req: Request, res: Response) {
		const service = new ClasseModuleService();
		const { id } = req.query;
		const result = await service.delete(id as string);
		return apiCreateResponseUtil(result, res);
	}

	@Get("/classes/dashboard")
	async getDashboard(req: Request, res: Response) {
		const service = new ClasseModuleService();
		let { page, perPage, ...query } = req.query;
		const result = await service.dailyClasses(
			Number(page) ?? 1,
			Number(perPage) ?? 10,
			res.locals["userData"]._id
		);
		return apiCreateResponseUtil(result, res);
	}
}
