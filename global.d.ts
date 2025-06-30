declare global {
  interface IProvider {
    name: string;
    execute: (...args?: any[]) => Promise<any>
  }

  type Request = import('express').Request;
  type Response = import('express').Response;
}

export {};