import { Injectable } from '@angular/core';
import { Observable, delay, map, of, throwError } from 'rxjs';

export interface LoginRequest {
  alias: string;
}

export interface LoginResponse {
  alias: string;
}

const STORAGE_KEY = 'forumhub_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(credentials: LoginRequest): Observable<LoginResponse> {
    const alias = credentials.alias.trim();

    if (!alias) {
      return throwError(() => new Error('Alias requerido'));
    }

    return of({ alias }).pipe(
      delay(600),
      map((response) => {
        localStorage.setItem(STORAGE_KEY, response.alias);
        return response;
      }),
    );
  }

  getStoredAlias(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return this.getStoredAlias() !== null;
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
