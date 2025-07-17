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
import { TaskModuleService } from "@src/module/task-module/task-module.service";

export class TaskModuleController extends Controller {
	@Post("/tasks")
	async create(req: Request, res: Response) {
		const service = new TaskModuleService();
		const result = await service.create({
			...req.body,
			userId: res.locals["userData"]._id
		});
		return apiCreateResponseUtil(result, res);
	}

	@Put("/tasks")
	async update(req: Request, res: Response) {
		const service = new TaskModuleService();
		const { id } = req.query;
		const result = await service.update(id as string, req.body, res.locals["userData"]._id);
		return apiCreateResponseUtil(result, res);
	}

	@Get("/tasks")
	async get(req: Request, res: Response) {
		const service = new TaskModuleService();
		const { page, perPage, ...query } = req.query;
		const result = await service.getPaginated(
			Number(page) ?? 1,
			Number(perPage) ?? 10,
			{ ...query, userId: res.locals["userData"]._id }
		);
		return apiCreateResponseUtil(result, res);
	}

	@Delete("/tasks")
	async delete(req: Request, res: Response) {
		const service = new TaskModuleService();
		const { id } = req.query;
		const result = await service.delete(id as string, res.locals["userData"]._id);
		return apiCreateResponseUtil(result, res);
	}

	@Get("/tasks/upcoming")
	async getUpcoming(req: Request, res: Response) {
		const service = new TaskModuleService();
		const { page, perPage, ...query } = req.query;
		const result = await service.getUpcoming(res.locals["userData"]._id);
		return apiCreateResponseUtil(result, res);
	}
}
