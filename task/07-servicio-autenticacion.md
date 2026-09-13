# 07 — Servicio de autenticación

**Dificultad:** Alta  
**Estado:** Pendiente  
**Dependencias:** 04, 06

## Objetivo

Crear el servicio de autenticación que conecte el formulario de acceso por alias con el backend del foro.

> ⚠️ Según Stitch, el login es por **alias** sin contraseña. Ajustar interfaces según API real del backend.

## Tareas

- [ ] Crear `AuthService` en `src/app/core/services/auth.service.ts`
- [ ] Definir interfaces tipadas:

```typescript
interface LoginRequest {
  alias: string;
}

interface LoginResponse {
  alias: string;
  token?: string;
  // ajustar según API del backend
}
```

- [ ] Implementar método `login(credentials: LoginRequest): Observable<LoginResponse>`
- [ ] Manejar errores HTTP (400, 409 alias ocupado, 500, red)
- [ ] Almacenar sesión:
  - `localStorage.setItem("forumhub_user", alias)` (como en Stitch)
  - Token JWT si el backend lo provee
- [ ] Crear `AuthGuard` para rutas protegidas del foro
- [ ] Redirigir a vista de comentarios/discusión tras login exitoso
- [ ] Conectar `onSubmit()` del componente login con el servicio
- [ ] Si el backend no está disponible, implementar modo mock con delay 600ms (como Stitch)

## Criterios de aceptación

- [ ] Login exitoso redirige a la ruta del foro
- [ ] Errores del backend se muestran en la UI (tarea 06)
- [ ] Alias persistido en localStorage
- [ ] Rutas protegidas bloquean acceso sin sesión
- [ ] Servicio testeable (inyección de dependencias)
