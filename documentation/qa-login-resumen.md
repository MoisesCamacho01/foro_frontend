# QA Login — Resumen de pruebas

**Fecha:** 2026-09-13  
**Vista:** Vista de Login - Foro de Comentarios  
**Referencia Stitch:** `documentation/stitch/login-reference.png`  
**URL probada:** http://localhost:4200/login  
**Herramienta:** Playwright (`pnpm test:e2e`)

## Resultado general

| Métrica | Valor |
|---------|-------|
| Pruebas ejecutadas | 9 |
| Pruebas exitosas | 9 |
| Pruebas fallidas | 0 |
| Estado | **APROBADO** |

## Pruebas funcionales

| # | Prueba | Resultado |
|---|--------|-----------|
| 1 | Ruta `/login` carga correctamente | ✅ PASS |
| 2 | Header muestra "ForumHub" y badge "Portal de Acceso" | ✅ PASS |
| 3 | Badge "Servidor en línea" visible | ✅ PASS |
| 4 | Campo alias tiene autofocus al cargar | ✅ PASS |
| 5 | Submit vacío muestra error de validación | ✅ PASS |
| 6 | Submit con alias válido → loading → éxito | ✅ PASS |
| 7 | Alias guardado en `localStorage` como `forumhub_user` | ✅ PASS |
| 8 | Botón deshabilitado durante loading | ✅ PASS |
| 9 | No se permite doble submit | ✅ PASS |

## Pruebas visuales

| # | Prueba | Resultado |
|---|--------|-----------|
| 1 | Estructura: header sticky + card centrada + footer | ✅ PASS |
| 2 | Iconos Phosphor renderizados (8 en estado idle) | ✅ PASS |
| 3 | Color primary del botón `#4F9AFF` | ✅ PASS |
| 4 | Color danger del error `#D60F1C` | ✅ PASS |
| 5 | Card con ancho ~448px (`max-w-md`) | ✅ PASS |
| 6 | Header con `position: sticky` | ✅ PASS |

## Screenshots capturados

| Archivo | Estado |
|---------|--------|
| `documentation/qa-screenshots/login-estado-idle.png` | Vista inicial |
| `documentation/qa-screenshots/login-estado-error.png` | Error de validación |
| `documentation/qa-screenshots/login-estado-loading.png` | Cargando acceso |
| `documentation/qa-screenshots/login-estado-success.png` | Acceso verificado |
| `documentation/qa-screenshots/login-comparacion-implementacion.png` | Comparación con Stitch |

### Comparación Stitch vs Implementación

| Aspecto | Stitch | Angular | Coincide |
|---------|--------|---------|----------|
| Layout general (header + card + footer) | ✅ | ✅ | Sí |
| Paleta de colores | `#4F9AFF`, `#5BFF4F`, `#D60F1C` | Igual | Sí |
| Tipografía sans-serif | ✅ | ✅ | Sí |
| Card con sombra suave y bordes redondeados | ✅ | ✅ | Sí |
| Iconos Phosphor | ✅ | ✅ | Sí |
| Estados error / loading / success | ✅ | ✅ | Sí |
| Footer con paleta del sistema | ✅ | ✅ | Sí |

## Incidencia encontrada y resolución

### Bug: estado success no se mostraba tras loading

**Síntoma:** Tras enviar el formulario, el botón quedaba en "Validando acceso..." indefinidamente.

**Causa:** Angular 22 sin Zone.js no detectaba cambios del callback RxJS en `subscribe()`.

**Resolución:** Migrar `uiState`, `showFieldError` y `welcomeAlias` a **signals** en `login.component.ts`.

**Archivo corregido:** `src/app/features/auth/login/login.component.ts`

## Cómo re-ejecutar las pruebas

```bash
# Requiere servidor en http://localhost:4200
pnpm test:e2e
```

## Conclusión

La vista de login implementada en Angular cumple con los criterios funcionales y visuales del diseño Stitch. Se recomienda proceder con la **tarea 09** (documentación final).
