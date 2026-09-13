# 00 — Análisis de la vista en Stitch

**Dificultad:** Baja  
**Estado:** Completado  
**Dependencias:** Ninguna

## Objetivo

Analizar la vista **"Vista de Login - Foro de Comentarios"** del proyecto Stitch **"Aplicación Foro Comentarios Interactivos"** y documentar todos los elementos visuales y de interacción necesarios para replicarla en Angular.

## Referencia Stitch

| Campo | Valor |
|-------|-------|
| Proyecto | Aplicación Foro Comentarios Interactivos |
| ID proyecto | `5862655047092008036` |
| URL | https://stitch.withgoogle.com/projects/5862655047092008036 |
| Vista | Vista de Login - Foro de Comentarios |
| ID pantalla | `9c8e96f074654137bc99115699702f37` |
| Dispositivo | `DESKTOP` (2560 × 2174 px) |
| Screenshot | `documentation/stitch/login-reference.png` |
| HTML referencia | `documentation/stitch/login-reference.html` |

## Estructura general de la página

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (sticky)                                             │
│  [Logo ForumHub] [Badge "Portal de Acceso"]  [Servidor ✓]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              ┌─────────────────────────┐                    │
│              │  Card login (max-w-md)  │                    │
│              │  - Icono bienvenida     │                    │
│              │  - Título + subtítulo   │                    │
│              │  - Input alias          │                    │
│              │  - Botón "Acceder"      │                    │
│              │  - Banner éxito (oculto)│                    │
│              │  - Features footer card │                    │
│              └─────────────────────────┘                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
│  Paleta del sistema (swatches) + ForumHub v2.0            │
└─────────────────────────────────────────────────────────────┘
```

## Paleta de colores (tokens)

```css
:root {
  --bg-main:    #FCFCFC;   /* Fondo página */
  --fg-main:    #242424;   /* Texto principal */
  --bg-card:    #FFFFFF;   /* Card / header / footer */
  --primary:    #4F9AFF;   /* Botón, logo, acentos */
  --secondary:  #5BFF4F;   /* Éxito, badge online */
  --danger:     #D60F1C;   /* Errores de validación */
  --info:       #14D9E0;   /* Badge info, iconos */
  --warning:    #EDE702;   /* Icono acceso instantáneo */
  --border:     #EDEDED;   /* Bordes card e inputs */
  --shadow:     #F2F2F2;   /* Sombra suave */
}
```

**Sombra de card:**
```css
box-shadow: 0 16px 36px -4px rgba(242, 242, 242, 1),
            0 8px 16px -6px rgba(210, 215, 225, 0.45);
```

## Tipografía

- Familia: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Título card: `text-2xl font-bold tracking-tight`
- Subtítulo: `text-sm text-gray-500`
- Labels: `text-sm font-medium`
- Inputs: `text-sm`
- Footer/header auxiliar: `text-xs`

## Inventario de componentes UI

| Elemento | Descripción | Comportamiento |
|----------|-------------|----------------|
| **Header sticky** | Logo azul con icono `chats-circle`, texto "ForumHub", badge "Portal de Acceso" (cyan) | Fijo arriba, `h-16`, borde inferior `#F2F2F2` |
| **Badge servidor** | Pill verde con punto pulsante + "Servidor en línea" | Solo visual, indica estado |
| **Icono bienvenida** | Cuadrado 80×80 azul claro con `user-circle`, badge verde con check | Decorativo |
| **Título** | "¡Bienvenido a ForumHub!" | Centrado |
| **Subtítulo** | "Ingresa tu alias para participar..." | Centrado, gris |
| **Campo alias** | Input texto con icono `@` a la izquierda, placeholder "Ingrese nombre de usuario" | `required`, autofocus al cargar |
| **Error inline** | Mensaje rojo con icono `warning-circle` | Visible si alias vacío al submit |
| **Botón submit** | "Acceder al foro" + flecha `arrow-right`, azul primario | Hover `#3b87ec`, active scale 0.98 |
| **Banner éxito** | Fondo verde claro, check, mensaje personalizado con alias | Aparece tras validación exitosa |
| **Features card** | "Sin contraseña requerida" + "Acceso instantáneo" con iconos | Separados por borde superior |
| **Footer** | Swatches de paleta + "ForumHub v2.0" | Informativo, parte del diseño |

## Estados de interacción (JS en Stitch)

| Estado | Trigger | Cambios visuales |
|--------|---------|------------------|
| **Idle** | Carga inicial | Input con autofocus |
| **Error** | Submit sin alias | Mensaje rojo bajo input |
| **Loading** | Submit válido | Botón disabled, texto "Validando acceso...", spinner |
| **Success** | Tras 600ms simulado | Botón verde, texto "¡Bienvenido, {alias}!", banner éxito animado |
| **Persistencia** | Éxito | `localStorage.setItem("forumhub_user", alias)` |

## Dependencias de diseño externas

- **Iconos:** Phosphor Icons (`@phosphor-icons/web`) — `chats-circle`, `user-circle`, `check-bold`, `at`, `arrow-right`, `warning-circle`, `shield-check`, `lightning`, `spinner`, `palette`
- **CSS:** Tailwind CSS 4 (ya instalado en el proyecto)

## Diferencias clave vs login tradicional

> ⚠️ Esta vista **NO** usa email ni contraseña. Es un acceso por **alias/nombre de usuario** únicamente.

- Sin campo de contraseña
- Sin toggle mostrar/ocultar contraseña
- Sin enlaces "Olvidé contraseña" / "Registrarse"
- Validación: solo `required` + trim del alias

## Criterios de aceptación

- [x] Vista localizada y abierta en Stitch
- [x] Screenshot guardado en `documentation/stitch/login-reference.png`
- [x] HTML de referencia en `documentation/stitch/login-reference.html`
- [x] Tokens de color y tipografía documentados
- [x] Lista completa de componentes UI identificados
- [x] Estados de interacción documentados
