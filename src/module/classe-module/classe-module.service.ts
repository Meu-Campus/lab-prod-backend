import { ApiResponse } from "@src/_types/api-response.type";
import { ClasseEntity } from "./classe-module.entity";
import { classeModuleModel } from "./classe-module.model";
import { PaginatedResponse } from "@src/_types/paginated.type";
import { endOfDay, startOfDay } from "date-fns";

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
		data: ClasseEntity,
		userId: string
	): Promise<ApiResponse> {
		await classeModuleModel
			.updateOne(
				{ _id: id, userId: userId },
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

		const today = new Date();
		const todayStr = today.toISOString().split("T")[0];

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
						subject: { $first: "$subject" },
						startTime: {
							$cond: [
								{ $regexMatch: { input: "$startTime", regex: /^[0-9]{2}:[0-9]{2}$/ } },
								{
									$dateFromString: {
										dateString: {
											$concat: [
												{ $dateToString: { date: "$$NOW", format: "%Y-%m-%d" } },
												"T",
												"$startTime",
												":00Z"
											]
										}
									}
								},
								"$startTime"
							]
						}
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

	async delete(id: string, userId: string): Promise<ApiResponse> {
		await classeModuleModel.updateOne({ _id: id, userId: userId }, {
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

	async dailyClasses(page: number, perPage: number, userId: string): Promise<ApiResponse<PaginatedResponse>> {
		const today = new Date();
		const startOfToday = startOfDay(today);
		const endOfToday = endOfDay(today);
		const todayDayOfWeek = today.getDay();

		const baseMatch = {
			active: true,
			userId: userId,
			$or: [
				{ isRecurring: true, dayOfWeek: todayDayOfWeek },
				{ isRecurring: { $ne: true }, date: { $gte: startOfToday, $lt: endOfToday } }
			]
		};

		console.log("Base Match:", JSON.stringify(baseMatch));

		const total = await classeModuleModel.countDocuments(baseMatch).exec();

		const list = await classeModuleModel.aggregate([
			{ $match: baseMatch },
			{ $sort: { date: 1 } },
			{ $skip: (page - 1) * perPage },
			{ $limit: perPage },
			{
				$lookup: {
					from: "subjects",
					localField: "subjectId",
					foreignField: "_id",
					as: "subjectInfo"
				}
			},
			{
				$lookup: {
					from: "teachers",
					localField: "teacherId",
					foreignField: "_id",
					as: "teacherInfo"
				}
			},
			{
				$unwind: {
					path: "$subjectInfo",
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$unwind: {
					path: "$teacherInfo",
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$project: {
					_id: 0,
					id: "$_id",
					room: "$room",
					startTime: {
						$cond: [
							{ $regexMatch: { input: "$startTime", regex: /^[0-9]{2}:[0-9]{2}$/ } },
							{
								$dateFromString: {
									dateString: {
										$concat: [
											{ $dateToString: { date: "$$NOW", format: "%Y-%m-%d" } },
											"T",
											"$startTime",
											":00Z"
										]
									}
								}
							},
							"$startTime"
						]
					},
					subject: {
						id: "$subjectInfo._id",
						name: "$subjectInfo.name"
					},
					teacher: {
						id: "$teacherInfo._id",
						name: "$teacherInfo.name"
					}
				}
			}
		]).exec();

		return {
			errors: [],
			message: "",
			data: {
				page,
				perPage,
				pages: Math.ceil(total / perPage),
				list,
				total
			}
		};
	}
}
