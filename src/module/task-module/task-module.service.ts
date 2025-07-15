import { ApiResponse } from "@src/_types/api-response.type";
import { TaskEntity } from "./task-module.entity";
import { taskModuleModel } from "./task-module.model";
import { PaginatedResponse } from "@src/_types/paginated.type";

export class TaskModuleService {
	async create(
		data: TaskEntity
	): Promise<ApiResponse> {
		await taskModuleModel.create(data);

		return {
			errors: [],
			data: {},
			message: "Criada com sucesso!"
		};
	}

	async update(
		id: string,
		data: TaskEntity
	): Promise<ApiResponse> {
		await taskModuleModel
			.updateOne(
				{ _id: id },
				{
					$set: data
				}
			)
			.exec();

		return {
			errors: [],
			data: {},
			message:
				"Atualizada com sucesso!"
		};
	}

	async getPaginated(
		page: number,
		perPage: number,
		query?: Record<string, any>
	): Promise<ApiResponse<PaginatedResponse>> {
		const total = await taskModuleModel
			.countDocuments({
				active: true
			})
			.exec();

		const list = await taskModuleModel
			.aggregate([
				{
					$match: {
						active: true,
						...query
					}
				},
				{
					$sort: {
						createdAt: -1
					}
				},
				{
					$skip: (page - 1) * perPage
				},
				{
					$limit: perPage
				},
				{
					$lookup: {
						from: "subject",
						localField: "subjectId",
						foreignField: "_id",
						as: "subject"
					}
				},
				{
					$addFields: {
						id: "$_id",
						subject: { $first: "$subject" }
					}
				},
				{
					$addFields: {
						id: "$_id"
					}
				}
			])
			.exec();

		return {
			errors: [],
			message: "",
			data: {
				page: page,
				perPage: perPage,
				pages: Math.ceil(total / perPage),
				list: list,
				total: total
			}
		};
	}

	async delete(id: string): Promise<ApiResponse> {
		await taskModuleModel.updateOne({ _id: id }, {
			$set: {
				active: false
			}
		}).exec();

		return {
			errors: [],
			data: {},
			message: "Excluída com sucesso!"
		};
	}
}
