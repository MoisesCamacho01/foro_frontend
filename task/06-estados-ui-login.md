# 06 — Estados de UI del login

**Dificultad:** Media-Alta  
**Estado:** Pendiente  
**Dependencias:** 04, 05

## Objetivo

Implementar todos los estados visuales e interactivos de la vista de login según Stitch.

## Estados a implementar

| Estado | Descripción | Elementos afectados |
|--------|-------------|---------------------|
| Idle | Vista inicial, autofocus en input | Input alias |
| Error | Alias vacío al submit | Mensaje rojo bajo input |
| Loading | Validación en curso (~600ms) | Botón disabled, spinner, texto "Validando acceso..." |
| Success | Acceso verificado | Botón verde, banner éxito animado, mensaje personalizado |
| Persistencia | Tras éxito | `localStorage.setItem("forumhub_user", alias)` |

## Tareas

- [ ] **Idle:** autofocus en input al `ngOnInit`
- [ ] **Error:** mostrar/ocultar mensaje con icono `warning-circle` en color `#D60F1C`
- [ ] **Loading:**
  - [ ] Botón disabled + `cursor-wait` + `opacity-90`
  - [ ] Texto cambia a "Validando acceso..."
  - [ ] Icono cambia a `spinner` con `animate-spin`
- [ ] **Success:**
  - [ ] Botón cambia a `bg-emerald-600`, texto "¡Bienvenido, {alias}!"
  - [ ] Icono cambia a `check-bold`
  - [ ] Banner éxito aparece con animación `scale-95 → scale-100`, `opacity-0 → opacity-100`
  - [ ] Mensaje: "Bienvenido @{alias}. Tu sesión está lista..."
- [ ] Guardar alias en `localStorage` tras éxito
- [ ] Prevenir doble submit
- [ ] Focus management (tab order, autofocus)

## Notas

- **No aplica:** toggle mostrar/ocultar contraseña (la vista no tiene contraseña)
- La transición loading → success en Stitch usa un `setTimeout` de 600ms; replicar con RxJS `delay` o `timer`

## Criterios de aceptación

- [ ] Cada estado visual coincide con Stitch
- [ ] No se puede enviar doble submit
- [ ] Banner de éxito animado correctamente
- [ ] Accesibilidad: `aria-busy`, `aria-invalid`, `aria-describedby`, `aria-live` en banner
