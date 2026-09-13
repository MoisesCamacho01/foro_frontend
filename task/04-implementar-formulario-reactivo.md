# 04 — Implementar formulario reactivo

**Dificultad:** Media  
**Estado:** Pendiente  
**Dependencias:** 03

## Objetivo

Implementar el formulario de acceso por alias con Angular Reactive Forms, validaciones y tipado estricto.

> ⚠️ Según Stitch, esta vista usa **solo alias** (sin email ni contraseña).

## Tareas

- [ ] Registrar `ReactiveFormsModule` / `FormBuilder` en el componente
- [ ] Crear interfaz `LoginForm`:

```typescript
interface LoginForm {
  alias: FormControl<string>;
}
```

- [ ] Definir validaciones:
  - Alias: `required`, `Validators.minLength(1)` (tras trim)
  - Opcional: `Validators.pattern(/^[a-zA-Z0-9_]+$/)` si el backend lo requiere
- [ ] Conectar input del template con `formControlName="alias"`
- [ ] Mostrar mensaje de error inline bajo el campo:
  - Texto: "Por favor ingresa un nombre de usuario válido."
  - Icono `warning-circle`, color `#D60F1C`
- [ ] Deshabilitar botón submit si el formulario es inválido
- [ ] Método `onSubmit()` con tipado estricto (sin `any`)
- [ ] Autofocus en el input al cargar la vista

## Criterios de aceptación

- [ ] Validación `required` funciona al enviar vacío
- [ ] Mensaje de error visible según diseño Stitch (rojo, con icono)
- [ ] Formulario no se envía si el alias está vacío
- [ ] Sin uso de `any` en el código
- [ ] Input con `autocomplete="off"` como en Stitch
