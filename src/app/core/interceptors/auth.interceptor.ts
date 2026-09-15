import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_CONFIG } from '@src/app/core/config/api.config';

export const TOKEN_STORAGE_KEY = 'forumhub_token';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const config = inject(API_CONFIG);
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const isApiRequest = request.url.startsWith(config.baseUrl);

  if (!token || !isApiRequest) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
