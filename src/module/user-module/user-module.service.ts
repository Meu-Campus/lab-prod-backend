import { UserModuleEntity } from "@src/module/user-module/user-module.entity";
import { ApiResponse } from "@src/_types/api-response.type";
import { userModuleModel } from "@src/module/user-module/user-module.model";
import { environment } from "@src/environment";
import * as bcrypt from "bcrypt";

export class UserModuleService {
  async create(data: UserModuleEntity): Promise<ApiResponse> {
    const findUser = await userModuleModel.findOne({
      email: data.email
    }).exec();

    if (findUser) {
      return { message: "error", errors: [{ key: "email", message: 'Já existe um usuário com esse email' }] };
    }

    const user = await userModuleModel.create({
      ...data,
      password: await bcrypt.hash(data.password, environment.bcryptSalt),
    });

    return { message: "User created successfully.", errors: [], data: user._id };
  }
}