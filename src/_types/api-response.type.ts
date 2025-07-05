export type ApiResponse = {
  message: string;
  errors: { key: string; message: string }[];
  data?: any;
}

export type File = Express.Multer.File;