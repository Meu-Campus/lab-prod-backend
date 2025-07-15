import { ApiResponse } from "@src/_types/api-response.type";
import { TeacherEntity } from "./teacher-module.entity";
import { teacherModuleModel } from "./teacher-module.model";
import { PaginatedResponse } from "@src/_types/paginated.type";

export class TeacherModuleService {
	async create(
		data: TeacherEntity
	): Promise<ApiResponse> {
		await teacherModuleModel.create(data);

		return {
			errors: [],
			data: {},
			message: "Criada com sucesso!"
		};
	}

	async update(
		id: string,
		data: TeacherEntity
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
				"Atualizada com sucesso!"
		};
	}

	async getPaginated(
		page: number,
		perPage: number,
		query?: Record<string, any>
	): Promise<ApiResponse<PaginatedResponse>> {
		const total = await teacherModuleModel
			.countDocuments({
				active: true,
				...query
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
						name: 1
					}
				},
				{
					$skip: (page - 1) * perPage
				},
				{
					$limit: perPage
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
		await teacherModuleModel.updateOne({ _id: id }, {
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

	async all(): Promise<ApiResponse<TeacherEntity[]>> {
		const list = await teacherModuleModel.aggregate([
			{ $match: { active: true } },
			{ $sort: { name: 1 } },
			{ $addFields: { id: "$_id" } }
		]).exec();

		return {
			errors: [],
			data: list,
			message: "Lista de professores obtida com sucesso!"
		};
	}
}
