import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG, buildApiUrl } from '@src/app/core/config/api.config';
import type { ApiResponse } from '@src/app/core/models/api-response.model';
import type { LoginRequest, LoginResponse } from '@src/app/core/models/auth.model';
import { unwrapApiResponse } from '@src/app/core/utils/unwrap-api-response.operator';

export interface LogoutResponse {
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApiAdapter {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const url = buildApiUrl(this.config, this.config.endpoints.auth.login);

    return this.http
      .post<ApiResponse<LoginResponse>>(url, credentials)
      .pipe(unwrapApiResponse());
  }

  logout(): Observable<LogoutResponse> {
    const url = buildApiUrl(this.config, this.config.endpoints.auth.logout);

    return this.http
      .post<ApiResponse<LogoutResponse>>(url, {})
      .pipe(unwrapApiResponse());
  }
}
