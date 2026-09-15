import { map, type OperatorFunction } from 'rxjs';
import type { ApiResponse } from '@src/app/core/models/api-response.model';

export function unwrapApiResponse<T>(): OperatorFunction<ApiResponse<T>, T> {
  return map((response) => {
    if (response.result !== 'SUCCESS' || response.data == null) {
      throw new Error(response.message || 'Error en la respuesta del servidor');
    }

    return response.data;
  });
}
