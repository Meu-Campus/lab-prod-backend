import { ApiResponse } from "@src/_types/api-response.type";
import { ClasseEntity } from "./classe-module.entity";
import { classeModuleModel } from "./classe-module.model";
import { PaginatedResponse } from "@src/_types/paginated.type";

export class ClasseModuleService {
	async create(
		data: ClasseEntity
	): Promise<ApiResponse> {
		await classeModuleModel.create(data);

		return {
			errors: [],
			data: {},
			message: "Criada com sucesso!"
		};
	}

	async update(
		id: string,
		data: ClasseEntity
	): Promise<ApiResponse> {
		await classeModuleModel
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
		const total = await classeModuleModel
			.countDocuments({
				active: true,
				...query
			})
			.exec();

		const list = await classeModuleModel
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
					$lookup: {
						from: "teacher",
						localField: "teacherId",
						foreignField: "_id",
						as: "teacher"
					}
				},
				{
					$addFields: {
						id: "$_id",
						teacher: { $first: "$teacher" },
						subject: { $first: "$subject" }
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
		await classeModuleModel.updateOne({ _id: id }, {
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
