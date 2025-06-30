import { logger } from "io-logger";
import express, { Router } from "express";
import { environment } from "./environment";
import cors from "cors";
import { providers } from "./providers/providers";
import { controllers } from "./controllers";
import { RouteConfig } from "@src/server/routing";

class Main {
  private buildRoutes(router: Router): Router {
    controllers.forEach(controller => {
      const ctor = controller.constructor as any;
      if (!ctor.routeConfigs) return;

      const { routeConfigs } = ctor as any;

      routeConfigs.forEach((routeConfig: RouteConfig) => {
        const { handle, method, middlewares, path } = routeConfig;

        const jobs = middlewares && middlewares.length ? [...middlewares, handle] : [handle];

        switch (method) {
          case 'get':
            router.get(path, ...jobs);
            break;
          case 'post':
            router.post(path, ...jobs);
            break;
          case 'put':
            router.put(path, ...jobs);
            break;
          case 'delete':
            router.delete(path, ...jobs);
            break;
        }
      });
    });
    return router;
  }

  async start() {
    logger.info('Starting the application...');
    const server = express();
    const router = express.Router({ mergeParams: true });

    await Promise.all(providers.map(async (provider) => {
      await provider.execute();
    }));


    server.use(express.json());
    server.use(cors());

    const buildedRoutes = this.buildRoutes(router);
    server.use(buildedRoutes);

    server.listen(environment.port, environment.host, () => {
      logger.info(`Server is running on http://${environment.host}:${environment.port}`);
    });
  }
}

const main = new Main();
main.start();