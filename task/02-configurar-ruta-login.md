# 02 — Configurar ruta `/login`

**Dificultad:** Baja  
**Estado:** Pendiente  
**Dependencias:** 01

## Objetivo

Registrar la ruta `/login` en el router de Angular y crear el componente standalone de login.

## Tareas

- [ ] Generar componente: `ng generate component features/auth/login --standalone`
- [ ] Registrar ruta en `src/app/app.routes.ts`:

```typescript
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('@src/app/features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
```

- [ ] Estructura de carpetas sugerida:

```
src/app/
├── features/
│   └── auth/
│       └── login/
│           ├── login.component.ts
│           ├── login.component.html
│           └── login.component.css
```

## Criterios de aceptación

- [ ] Navegar a `http://localhost:4200/login` muestra el componente
- [ ] Ruta lazy-loaded correctamente
- [ ] Redirección desde `/` hacia `/login`
