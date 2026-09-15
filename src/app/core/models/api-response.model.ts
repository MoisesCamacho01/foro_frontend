export type ApiResult = 'SUCCESS' | 'ERROR';

export interface ApiResponse<T> {
  result: ApiResult;
  message: string;
  data: T;
  timestamp?: string;
}
