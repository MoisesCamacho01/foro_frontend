export interface LoginRequest {
  alias: string;
}

export interface LoginResponse {
  alias: string;
  token?: string;
}
