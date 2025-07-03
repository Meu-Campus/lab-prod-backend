export type ApiResponse = {
  message: string;
  errors: { key: string; message: string }[];
  data?: any;
}