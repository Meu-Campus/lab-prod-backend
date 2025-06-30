import * as e from 'express';

export type Request = e.Request;
export type Response = e.Response;
export type NextFunction = e.NextFunction;

export type RouteConfig = {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  middlewares?: e.RequestHandler[];
  handle: e.RequestHandler;
}

export abstract class Controller {
  routeConfigs?: RouteConfig[];
}

export const createRouteDecorator = (method: 'get' | 'post' | 'put' | 'delete'): Function =>
  function (path: string, middlewares: Function[] = []) {
    return function (target: any, propertyKey: string) {
      const ctor = target.constructor;
      if (!ctor.routeConfigs) {
        ctor.routeConfigs = [];
      }

      const handle = target[propertyKey];
      if (handle instanceof Function) {
        ctor.routeConfigs.push({
          path,
          method,
          middlewares,
          handle,
        });
      }
    };
  };


export const Get = createRouteDecorator('get');
export const Post = createRouteDecorator('post');
export const Put = createRouteDecorator('put');
export const Delete = createRouteDecorator('delete');

