import { Controller, Get, Response, Request } from "@src/server/routing";
import { userModuleModel } from "@src/module/user-module/user-module.model";

export class UserModuleController extends Controller {
  @Get("/user")
  async create(req: Request, res: Response) {
    return await userModuleModel.create({
      name: "John Doe",
      email: "sdsd",
      password: "password123",
      phone: "1234567890"
    });
  }
}