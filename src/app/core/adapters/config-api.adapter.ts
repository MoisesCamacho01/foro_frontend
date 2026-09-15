import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG, buildApiUrl } from '@src/app/core/config/api.config';
import type { ApiResponse } from '@src/app/core/models/api-response.model';
import type { AppConfig } from '@src/app/core/models/config.model';
import { unwrapApiResponse } from '@src/app/core/utils/unwrap-api-response.operator';

@Injectable({ providedIn: 'root' })
export class ConfigApiAdapter {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG);

  getConfig(): Observable<AppConfig> {
    const url = buildApiUrl(this.config, this.config.endpoints.config.config);

    return this.http.get<ApiResponse<AppConfig>>(url).pipe(unwrapApiResponse());
  }
}
