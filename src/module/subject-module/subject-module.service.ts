import { ApiResponse } from "@src/_types/api-response.type";
import { SubjectEntity } from "./subject-module.entity";
import { subjectModuleModel } from "./subject-module.model";
import { PaginatedResponse } from "@src/_types/paginated.type";

export class SubjectModuleService {
	async create(
		data: SubjectEntity
	): Promise<ApiResponse> {
		await subjectModuleModel.create(data);

		return {
			errors: [],
			data: {},
			message: "Disciplina criada com sucesso!"
		};
	}

	async update(
		id: string,
		data: SubjectEntity
	): Promise<ApiResponse> {
		await subjectModuleModel
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
				"Disciplina atualizada com sucesso!"
		};
	}

	async getPaginated(
		page: number,
		perPage: number,
		query?: Record<string, any>
	): Promise<ApiResponse<PaginatedResponse>> {
		const total = await subjectModuleModel
			.countDocuments({
				active: true
			})
			.exec();

		const list = await subjectModuleModel
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
		await subjectModuleModel.updateOne({ _id: id }, {
			$set: {
				active: false
			}
		}).exec();

		return {
			errors: [],
			data: {},
			message: "Disciplina excluída com sucesso!"
		};
	}
}
