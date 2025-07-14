import { ApiResponse } from "@src/_types/api-response.type";
import { SubjectEntity } from "./teacher-module.entity";
import { teacherModuleModel } from "./teacher-module.model";
import { PaginatedResponse } from "@src/_types/paginated.type";

export class TeacherModuleService {
	async create(
		data: SubjectEntity
	): Promise<ApiResponse> {
		await teacherModuleModel.create(data);

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
		await teacherModuleModel
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
		const total = await teacherModuleModel
			.countDocuments({
				active: true
			})
			.exec();

		const list = await teacherModuleModel
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
		await teacherModuleModel.updateOne({ _id: id }, {
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
