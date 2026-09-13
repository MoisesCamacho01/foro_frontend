# 11 — Proteger ruta `/foro` y redirigir tras login

**Dificultad:** Baja  
**Estado:** Completado  
**Dependencias:** 10

## Objetivo

Exponer la vista de comentarios en `/foro`, exigir sesión por alias y conectar el login existente con esta ruta.

## Contexto

`AuthService` ya persiste `forumhub_user` en `localStorage` y expone `isAuthenticated()`, `getStoredAlias()` y `logout()`. El login aún no redirige al foro (queda pendiente en la documentación del login).

## Tareas

- [ ] Crear `authGuard` en `src/app/core/guards/auth.guard.ts` (functional guard)
- [ ] Si no hay alias en `localStorage`, redirigir a `/login`
- [ ] Registrar ruta lazy-loaded:

```typescript
{
  path: 'foro',
  canActivate: [authGuard],
  loadComponent: () =>
    import('@src/app/features/forum/forum.component').then((m) => m.ForumComponent),
}
```

- [ ] Tras login **success**, navegar a `/foro` (mantener el banner de éxito ~600–800 ms o navegar al completar el mock)
- [ ] Si el usuario autenticado entra a `/login`, redirigir a `/foro` (opcional, `guestGuard`)
- [ ] El header de la vista de foro debe leer el alias con `AuthService.getStoredAlias()`
- [ ] Tipado estricto, imports con `@src/`

## Estructura de carpetas

```
src/app/
├── core/
│   ├── guards/
│   │   └── auth.guard.ts
│   └── services/
│       └── auth.service.ts
└── features/
    └── forum/
        ├── forum.component.ts
        └── forum.component.html
```

## Criterios de aceptación

- [ ] `http://localhost:4200/foro` sin sesión redirige a `/login`
- [ ] Login exitoso termina en `/foro`
- [ ] Con `forumhub_user` la ruta `/foro` carga el componente
- [ ] El alias del header coincide con el valor persistido
