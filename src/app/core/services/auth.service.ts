import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthApiAdapter } from '@src/app/core/adapters/auth-api.adapter';
import type { LoginRequest, LoginResponse } from '@src/app/core/models/auth.model';

export type { LoginRequest, LoginResponse } from '@src/app/core/models/auth.model';

const USER_STORAGE_KEY = 'forumhub_user';
const TOKEN_STORAGE_KEY = 'forumhub_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authApi = inject(AuthApiAdapter);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const alias = credentials.alias.trim();

    if (!alias) {
      return throwError(() => new Error('Alias requerido'));
    }

    return this.authApi.login({ alias }).pipe(
      tap((response) => this.persistSession(response)),
      catchError((error) => throwError(() => error)),
    );
  }

  getStoredAlias(): string | null {
    return localStorage.getItem(USER_STORAGE_KEY);
  }

  getStoredToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return this.getStoredAlias() !== null && this.getStoredToken() !== null;
  }

  logout(): void {
    if (!this.getStoredToken()) {
      this.clearSession();
      return;
    }

    this.authApi.logout().subscribe({
      complete: () => this.clearSession(),
      error: () => this.clearSession(),
    });
  }

  clearSession(): void {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  private persistSession(response: LoginResponse): void {
    localStorage.setItem(USER_STORAGE_KEY, response.alias);

    if (response.token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
    }
  }
}
