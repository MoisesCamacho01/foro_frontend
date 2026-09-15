import { InjectionToken } from '@angular/core';
import { environment } from '@src/environments/environment';
import { API_ENDPOINTS, type ApiEndpoints } from '@src/app/core/config/api-endpoints';

export interface ApiConfig {
  baseUrl: string;
  endpoints: ApiEndpoints;
}

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG', {
  providedIn: 'root',
  factory: (): ApiConfig => ({
    baseUrl: environment.apiBaseUrl,
    endpoints: API_ENDPOINTS,
  }),
});

export function buildApiUrl(config: ApiConfig, path: string): string {
  const base = config.baseUrl.replace(/\/$/, '');
  const endpoint = path.startsWith('/') ? path : `/${path}`;

  return `${base}${endpoint}`;
}
