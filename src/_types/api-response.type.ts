export type ApiResponse<T = any> = {
  message: string;
  errors: { key: string; message: string }[];
  data?: T;
}

export type File = Express.Multer.File;