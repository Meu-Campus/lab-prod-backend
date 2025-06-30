import { Controller, Get, Response, Request } from "@src/server/routing";

export class UserModuleController extends Controller {
  @Get("/user")
  async create(req: Request, res: Response) {
    return res.send([{ id: 0 }])
  }
}