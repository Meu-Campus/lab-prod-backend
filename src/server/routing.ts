export type RouteConfig = {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  middlewares?: Function[];
  handle: Function;
}

export abstract class Controller {
  routeConfigs?: RouteConfig[];
}

export const createRouteDecorator = (method: 'get' | 'post' | 'put' | 'delete'): Function =>
  function (path: string, middlewares: Function[] = []): Function {
    return function (target: any, propertyKey: string) {
      if (!target.routeConfigs) {
        target.routeConfigs = [];
      }

      const handler = target[propertyKey];

      if (handler instanceof Function) {
        target.routeConfigs.push({
          path,
          method,
          middlewares,
          handler
        })
      }
    }
  }

export const Get = createRouteDecorator('get');
export const Post = createRouteDecorator('post');
export const Put = createRouteDecorator('put');
export const Delete = createRouteDecorator('delete');

