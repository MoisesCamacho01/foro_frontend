# Tareas: Vista de Login - Foro de Comentarios

Implementación de la vista **"Vista de Login - Foro de Comentarios"** del proyecto Stitch **"Aplicación Foro Comentarios Interactivos"** en Angular 22 con Tailwind CSS.

Siguiente vista: [Vista de Comentarios y Discusión - ForumHub](./README-comentarios.md) (tareas 10–20).

## Proyecto Stitch

| Campo | Valor |
|-------|-------|
| Nombre | Aplicación Foro Comentarios Interactivos |
| ID | `5862655047092008036` |
| URL | https://stitch.withgoogle.com/projects/5862655047092008036 |
| Vista objetivo | Vista de Login - Foro de Comentarios |
| ID pantalla | `9c8e96f074654137bc99115699702f37` |
| Referencia visual | `documentation/stitch/login-reference.png` |
| HTML referencia | `documentation/stitch/login-reference.html` |

## Resumen del diseño

- **Tipo de acceso:** Alias/nombre de usuario (sin contraseña)
- **Layout:** Header sticky + card centrada + footer con paleta
- **Marca:** ForumHub v2.0
- **Iconos:** Phosphor Icons
- **Colores clave:** Primary `#4F9AFF`, Secondary `#5BFF4F`, Danger `#D60F1C`

## Orden de ejecución

Las tareas están ordenadas por dificultad (de menor a mayor):

| # | Tarea | Dificultad | Dependencias |
|---|-------|------------|--------------|
| 00 | [Análisis de la vista en Stitch](./00-analisis-vista-login.md) | Baja | — |
| 01 | [Configurar alias `@src/`](./01-configurar-alias-src.md) | Baja | — |
| 02 | [Configurar ruta `/login`](./02-configurar-ruta-login.md) | Baja | 01 |
| 03 | [Crear layout del login](./03-crear-layout-login.md) | Media | 00, 02 |
| 04 | [Implementar formulario reactivo](./04-implementar-formulario-reactivo.md) | Media | 03 |
| 05 | [Estilizar con Tailwind](./05-estilizar-vista-tailwind.md) | Media | 00, 03 |
| 06 | [Estados de UI del login](./06-estados-ui-login.md) | Media-Alta | 04, 05 |
| 07 | [Servicio de autenticación](./07-servicio-autenticacion.md) | Alta | 04, 06 |
| 08 | [Pruebas QA con Playwright](./08-pruebas-qa-playwright.md) | Alta | 05, 06, 07 |
| 09 | [Documentación del login](./09-documentacion-login.md) | Baja | 08 |

## Requisitos previos

1. **Stitch MCP configurado** o sesión activa en https://stitch.withgoogle.com
2. Proyecto Angular corriendo en puerto `4200` (`pnpm dev`)
3. Tailwind CSS 4 ya instalado en el proyecto
4. Instalar Phosphor Icons: `pnpm add @phosphor-icons/web`

## Nota importante

Esta vista usa **acceso por alias** (sin email ni contraseña). Las tareas 04, 06 y 07 están adaptadas a este flujo según el análisis de Stitch (tarea 00).
