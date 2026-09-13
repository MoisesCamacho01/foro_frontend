# 05 — Estilizar vista con Tailwind

**Dificultad:** Media  
**Estado:** Pendiente  
**Dependencias:** 00, 03

## Objetivo

Aplicar estilos Tailwind para que la vista de login sea **idéntica** al diseño de Stitch.

## Referencia de tokens

Ver `documentation/stitch/login-reference.html` y análisis en tarea `00`.

## Tareas

- [ ] Configurar variables CSS en `src/styles.css`:

```css
@theme {
  --color-bg-main: #FCFCFC;
  --color-fg-main: #242424;
  --color-bg-card: #FFFFFF;
  --color-primary: #4F9AFF;
  --color-secondary: #5BFF4F;
  --color-danger: #D60F1C;
  --color-info: #14D9E0;
  --color-warning: #EDE702;
  --color-border: #EDEDED;
  --shadow-card: 0 16px 36px -4px rgba(242, 242, 242, 1),
                 0 8px 16px -6px rgba(210, 215, 225, 0.45);
}
```

- [ ] Instalar e importar Phosphor Icons (`@phosphor-icons/web`)
- [ ] Estilizar **header**:
  - [ ] Sticky, fondo blanco, sombra sutil, borde `#F2F2F2`
  - [ ] Logo azul con sombra `shadow-[#4F9AFF]/25`
  - [ ] Badge "Portal de Acceso" cyan
  - [ ] Badge "Servidor en línea" verde con punto `animate-pulse`
- [ ] Estilizar **card**:
  - [ ] Fondo blanco, borde `#EDEDED`, sombra custom, `rounded-2xl`
  - [ ] Hover: `hover:shadow-xl transition-all duration-300`
- [ ] Estilizar **input alias**:
  - [ ] Fondo `#FCFCFC`, borde `#EDEDED`, `rounded-xl py-3`
  - [ ] Focus: borde `#4F9AFF`, ring `focus:ring-[#4F9AFF]/20`
  - [ ] Icono `@` posicionado con `absolute left`
- [ ] Estilizar **botón submit**:
  - [ ] `bg-[#4F9AFF]`, hover `#3b87ec`, sombra `shadow-[#4F9AFF]/30`
  - [ ] Active: `active:scale-[0.98]`
  - [ ] Flecha con `group-hover:translate-x-1`
- [ ] Estilizar **banner éxito** (oculto por defecto):
  - [ ] `bg-emerald-50 border-[#5BFF4F] rounded-xl`
- [ ] Estilizar **features** del card y **footer** con paleta
- [ ] Comparar lado a lado con `documentation/stitch/login-reference.png`

## Criterios de aceptación

- [ ] Colores coinciden con tokens de Stitch
- [ ] Espaciado, bordes y sombras coinciden con el diseño
- [ ] Estados hover/focus implementados
- [ ] Iconos Phosphor renderizados correctamente
- [ ] Vista visualmente idéntica al screenshot de referencia
