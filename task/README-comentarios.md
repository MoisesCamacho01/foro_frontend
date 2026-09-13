# Tareas: Vista de Comentarios y Discusión - ForumHub

Implementación de la vista **"Vista de Comentarios y Discusión - ForumHub"** del proyecto Stitch **"Aplicación Foro Comentarios Interactivos"** en Angular 22 con Tailwind CSS.

## Proyecto Stitch

| Campo | Valor |
|-------|-------|
| Nombre | Aplicación Foro Comentarios Interactivos |
| ID | `5862655047092008036` |
| URL | https://stitch.withgoogle.com/projects/5862655047092008036 |
| Vista objetivo | Vista de Comentarios y Discusión - ForumHub |
| ID pantalla | `62ea16fd9c71461ba909e040d4b53089` |
| Dispositivo | `DESKTOP` (2560 × 2212 px) |
| Referencia visual | `documentation/stitch/comments-reference.png` |
| HTML referencia | `documentation/stitch/comments-reference.html` |

## Resumen del diseño

- **Ruta protegida:** `/foro` (requiere alias en `localStorage` `forumhub_user`)
- **Layout:** Header sticky autenticado + main `max-w-5xl` + footer con paleta
- **Marca:** ForumHub, badge "Comunidad Activa"
- **Contenido:** Card de nueva pregunta + card de hilo con réplicas en escalera
- **Interacción:** Publicar pregunta, replicar en cualquier nivel, like/dislike mutuamente exclusivos
- **Iconos:** Phosphor Icons
- **Colores clave:** Primary `#4F9AFF`, Secondary `#5BFF4F`, Danger `#D60F1C`, Info `#14D9E0`

## Relación con el login

El login (tareas 00–09) ya está implementado. Esta vista es el destino posterior al acceso por alias.

- El header muestra el alias autenticado (en Stitch: "Alex Rivera")
- Tras login exitoso hay que redirigir a `/foro`
- Sin sesión, redirigir a `/login`

## Orden de ejecución

Las tareas están ordenadas por dificultad (de menor a mayor):

| # | Tarea | Dificultad | Dependencias | Estado |
|---|-------|------------|--------------|--------|
| 10 | [Análisis de la vista en Stitch](./10-analisis-vista-comentarios.md) | Baja | — | Completado |
| 11 | [Proteger ruta `/foro` y redirigir tras login](./11-proteger-ruta-foro.md) | Baja | 10 | Completado |
| 12 | [Modelos y servicio mock de comentarios](./12-modelos-servicio-comentarios.md) | Media | 10, 11 | Completado |
| 13 | [Crear layout del foro](./13-layout-vista-foro.md) | Media | 10, 11 | Completado |
| 14 | [Formulario de nueva pregunta](./14-formulario-nueva-pregunta.md) | Media | 12, 13 | Completado |
| 15 | [Card de pregunta principal](./15-card-pregunta-hilo.md) | Media | 12, 13 | Completado |
| 16 | [Estilizar con Tailwind](./16-estilizar-vista-comentarios.md) | Media | 10, 13, 14, 15 | Completado |
| 17 | [Árbol jerárquico de réplicas](./17-arbol-replicas-jerarquico.md) | Media-Alta | 12, 15 | Completado |
| 18 | [Votos me gusta / no me gusta](./18-votos-like-dislike.md) | Alta | 15, 17 | Completado |
| 19 | [Pruebas QA con Playwright](./19-pruebas-qa-comentarios.md) | Alta | 16, 17, 18 | Completado |
| 20 | [Documentación del foro](./20-documentacion-comentarios.md) | Baja | 19 | Completado |

## Requisitos previos

1. Vista de login operativa (`/login`, `AuthService`, `forumhub_user`)
2. **Stitch MCP configurado** o sesión activa en https://stitch.withgoogle.com
3. Proyecto Angular corriendo en puerto `4200` (`pnpm dev`)
4. Tailwind CSS 4 y Phosphor Icons ya instalados

## Nota importante

El HTML exportado de Stitch incluye texto de prototipo (`sadasdasd…`) y réplicas extra de "Alex Rivera" generadas al probar la interacción en el canvas. **No copiar ese ruido.** Usar el hilo de ejemplo canónico documentado en la tarea 10 (Carlos → Mariana → David → Sofía).
