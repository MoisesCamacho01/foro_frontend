import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ConfigApiAdapter } from '@src/app/core/adapters/config-api.adapter';
import { canReplyAtLevel, type AppConfig } from '@src/app/core/models/config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly configApi = inject(ConfigApiAdapter);
  private readonly maxReplyLevelsState = signal<number | null>(null);

  readonly maxReplyLevels = this.maxReplyLevelsState.asReadonly();

  loadConfig(): Observable<AppConfig> {
    return this.configApi.getConfig().pipe(
      tap((config) => this.maxReplyLevelsState.set(config.maxReplyLevels)),
    );
  }

  canReplyAtLevel(level: number): boolean {
    return canReplyAtLevel(level, this.maxReplyLevelsState());
  }
}
