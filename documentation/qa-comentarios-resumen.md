# QA Comentarios — Resumen de pruebas

**Fecha:** 2026-09-13  
**Vista:** Vista de Comentarios y Discusión - ForumHub  
**Referencia Stitch:** `documentation/stitch/comments-reference.png`  
**URL probada:** http://localhost:4200/foro  
**Herramienta:** Playwright (`pnpm test:e2e`)

## Resultado general

| Métrica | Valor |
|---------|-------|
| Pruebas ejecutadas (suite completa) | 23 |
| Login | 9/9 |
| Comentarios | 14/14 |
| Pruebas fallidas | 0 |
| Estado | **APROBADO** |

## Pruebas funcionales

| # | Prueba | Resultado |
|---|--------|-----------|
| 1 | Sin sesión, `/foro` redirige a `/login` | ✅ PASS |
| 2 | Sesión activa muestra `/foro` con alias en el header | ✅ PASS |
| 3 | Header, título y badge de usuarios | ✅ PASS |
| 4 | Publicar pregunta vacía no cambia el hilo | ✅ PASS |
| 5 | Publicar pregunta actualiza el hilo y limpia el textarea | ✅ PASS |
| 6 | Reply box de `q1` oculto y visible al replicar | ✅ PASS |
| 7 | Réplica vacía a `q1` no crea nodo | ✅ PASS |
| 8 | Réplica a `q1` añade "Respuesta directa" | ✅ PASS |
| 9 | Réplica anidada añade "Sub-réplica escalonada" | ✅ PASS |
| 10 | Like/dislike mutuamente exclusivos y desmarcables | ✅ PASS |
| 11 | Hilo canónico: Carlos, Mariana, David, Sofía | ✅ PASS |

## Pruebas visuales

| # | Prueba | Resultado |
|---|--------|-----------|
| 1 | Header sticky + dos cards + footer | ✅ PASS |
| 2 | Color primary `#4F9AFF` en logo y botón publicar | ✅ PASS |
| 3 | Líneas de árbol `.thread-line` | ✅ PASS |
| 4 | IDs de Stitch (`view-forum`, `text-question`, `replies-tree`) | ✅ PASS |
| 5 | Estados: reply abierto, like activo, dislike activo | ✅ PASS |

## Screenshots capturados

| Archivo | Estado |
|---------|--------|
| `documentation/qa-screenshots/comentarios-estado-idle.png` | Vista inicial |
| `documentation/qa-screenshots/comentarios-estado-reply-abierto.png` | Caja de réplica abierta |
| `documentation/qa-screenshots/comentarios-estado-like.png` | Like activo |
| `documentation/qa-screenshots/comentarios-estado-dislike.png` | Dislike activo |
| `documentation/qa-screenshots/comentarios-comparacion-implementacion.png` | Comparación con Stitch |

### Comparación Stitch vs Implementación

| Aspecto | Stitch | Angular | Coincide |
|---------|--------|---------|----------|
| Header autenticado (ForumHub, Comunidad Activa, alias) | ✅ | ✅ | Sí |
| Card crear pregunta + card hilo | ✅ | ✅ | Sí |
| Paleta `#4F9AFF`, `#5BFF4F`, `#D60F1C`, `#14D9E0` | ✅ | ✅ | Sí |
| Árbol de 3 niveles con líneas | ✅ | ✅ | Sí |
| Like/dislike mutuamente exclusivos | ✅ | ✅ | Sí |
| Footer paleta + "Reglas y jerarquía activas" | ✅ | ✅ | Sí |
| Texto de prototipo `sadasdasd…` | Ruido del canvas | Seed canónico | Intencional |

## Verificación manual en navegador

Flujo real en `http://localhost:4200`:

1. Login con alias `Moises Dev` → banner de éxito → redirección a `/foro`
2. Like en la pregunta: contador 15 → 16 y botón `like-active`
3. Réplica directa visible con badge "Respuesta directa" y contador de hilo 4
4. Publicar pregunta reemplaza el cuerpo y resetea votos a 0/0

## Cómo re-ejecutar las pruebas

```bash
# Requiere servidor en http://localhost:4200
pnpm test:e2e
```

## Conclusión

La vista de comentarios implementada en Angular cumple los criterios funcionales y visuales del diseño Stitch. El login existente sigue pasando (9/9).
