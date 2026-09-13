# 10 — Análisis de la vista en Stitch

**Dificultad:** Baja  
**Estado:** Completado  
**Dependencias:** Ninguna

## Objetivo

Analizar la vista **"Vista de Comentarios y Discusión - ForumHub"** del proyecto Stitch **"Aplicación Foro Comentarios Interactivos"** y documentar todos los elementos visuales y de interacción necesarios para replicarla en Angular.

## Referencia Stitch

| Campo | Valor |
|-------|-------|
| Proyecto | Aplicación Foro Comentarios Interactivos |
| ID proyecto | `5862655047092008036` |
| URL | https://stitch.withgoogle.com/projects/5862655047092008036 |
| Vista | Vista de Comentarios y Discusión - ForumHub |
| ID pantalla | `62ea16fd9c71461ba909e040d4b53089` |
| Dispositivo | `DESKTOP` (2560 × 2212 px) |
| Screenshot | `documentation/stitch/comments-reference.png` |
| HTML referencia | `documentation/stitch/comments-reference.html` |

## Estructura general de la página

```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER (sticky)                                                  │
│  [Logo] ForumHub [Comunidad Activa]  Foro / Hilo de discusión    │
│                                           [● Alex Rivera]        │
├──────────────────────────────────────────────────────────────────┤
│ MAIN (max-w-5xl)                                                 │
│  Título: Preguntas de la Comunidad     [● 12 Usuarios en línea]  │
│                                                                  │
│  ┌─ Card 1: Crear una nueva pregunta ─────────────────────────┐  │
│  │  Header (icono + título + Comunidad Activa)                │  │
│  │  textarea#text-question                                    │  │
│  │  "Respuesta promedio…"              [Publicar Pregunta]    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ Card 2: Hilo de discusión ────────────────────────────────┐  │
│  │  Badges #DesarrolloWeb + Discusión Activa    Hace 2 horas  │  │
│  │  Pregunta principal (autor CR, acciones, reply box)        │  │
│  │  ── Hilo de Respuestas (N) ──                              │  │
│  │    Nivel 1 ──► Nivel 2 ──► Nivel 3  (líneas de árbol)      │  │
│  └────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│ FOOTER                                                           │
│  Paleta del sistema + "Reglas y jerarquía activas"               │
└──────────────────────────────────────────────────────────────────┘
```

## Paleta de colores (tokens)

Reutilizar los tokens ya definidos en `src/styles.css`. Stitch añade una sombra de card distinta a la del login:

```css
:root {
  --bg-main:    #FCFCFC;
  --fg-main:    #242424;
  --bg-card:    #FFFFFF;
  --primary:    #4F9AFF;
  --secondary:  #5BFF4F;
  --danger:     #D60F1C;
  --info:       #14D9E0;
  --warning:    #EDE702;
  --border:     #EDEDED;
  --shadow:     #F2F2F2;
}
```

**Sombra de card (esta vista):**
```css
box-shadow: 0 10px 25px -5px #F2F2F2,
            0 8px 10px -6px #F2F2F2;
```

**Estados de voto:**
```css
.like-active    { color: #4F9AFF; background: #eff6ff; border-color: #4F9AFF; }
.dislike-active { color: #D60F1C; background: #fef2f2; border-color: #D60F1C; }
```

**Líneas de jerarquía (`.thread-line`):** color `#E2E8F0`, grosor 2px, offset `left: -20px`.

## Tipografía

- Familia: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Título de página: `text-2xl font-bold`
- Subtítulo: `text-sm text-gray-500`
- Título de card: `text-base font-bold`
- Pregunta principal: `text-base font-medium leading-relaxed`
- Réplicas: `text-xs leading-relaxed`
- Meta/badges: `text-xs` / `text-[10px]` / `text-[11px]`
- Footer: `text-xs text-gray-500`

## Inventario de componentes UI

| Elemento | Descripción | Comportamiento |
|----------|-------------|----------------|
| **Header sticky** | Logo `chats-circle` 40×40 azul, "ForumHub", badge cyan "Comunidad Activa" | Fijo, `h-16`, borde `#F2F2F2` |
| **Breadcrumb** | `Foro / Hilo de discusión` (oculto en mobile `hidden md:flex`) | "Foro" es enlace hover primary |
| **Badge usuario** | Punto verde + alias (`#user-badge`, `#header-username`) | Sale de `forumhub_user` |
| **Título de página** | "Preguntas de la Comunidad" + subtítulo | Un solo `<h1>` (Stitch anida dos; no replicar el bug) |
| **Badge online** | "12 Usuarios en línea" verde | Informativo |
| **Card crear pregunta** | Icono `chat-teardrop-dots`, textarea `#text-question`, botón `#add_question` | Publica y limpia el textarea |
| **Hint de tiempo** | Icono `clock` + "Respuesta promedio en menos de 15 min" | Solo visual |
| **Card hilo** | Badges tema + tiempo relativo | Contiene pregunta + árbol |
| **Pregunta principal** | Avatar iniciales con gradiente primary→info, badge "Autor", menú `dots-three-vertical` | Acciones de voto y réplica |
| **Acciones** | Me gusta, No me gusta, contadores, Replicar | Ver reglas de voto |
| **Reply box** | Input `#reply` + botón `#add_reply` (oculto por defecto) | Toggle al clic en Replicar |
| **Árbol de réplicas** | Cards anidadas con `.thread-line`, badge de nivel | Réplica se anexa al padre |
| **Footer** | Swatches de paleta + estado "Reglas y jerarquía activas" | Informativo |

## Hilo canónico de ejemplo (seed)

El HTML exportado está contaminado por pruebas en el canvas de Stitch (texto `sadasdasd…` y réplicas extra de Alex Rivera). **Usar este seed**, alineado con el diseño original:

| ID | Autor | Handle / meta | Nivel | Contenido |
|----|-------|---------------|-------|-----------|
| `q1` | Carlos Rodríguez | `@carlos_dev` · Autor · 14:30 · Hace 2 horas | Pregunta | Estoy implementando un foro con mutaciones optimistas y réplicas anidadas. ¿Cuál es la mejor forma de estructurar el estado para que el árbol se actualice sin recrear todo el DOM? |
| `r1` | Mariana López | hace 1 hora | Nivel 1 | Recomiendo separar la capa de mutación optimista para los votos y las réplicas; de este modo la interfaz responde inmediatamente sin esperar latencias del servidor. |
| `r1_1` | David Valenzuela | hace 45 min | Nivel 2 (Sub-réplica) | ¡Totalmente de acuerdo! También es clave manejar estructuras de árbol en memoria (parentId) para renderizar el anidamiento sin recrear todo el DOM. |
| `r1_1_1` | Sofía Gómez | hace 20 min | Nivel 3 | Exacto, un esquema con nodos enlazados permite crecer la profundidad sin penalizar rendimiento. |

**Votos iniciales (HTML de Stitch):**

| ID | Likes | Dislikes |
|----|-------|----------|
| `q1` | 15 | 1 |
| `r1` | 9 | 1 |
| `r1_1` | 6 | 1 |
| `r1_1_1` | 3 | 0 |

Contador de hilo inicial: **3** réplicas (no 9; el 9 incluye ruido de prototipo).

## Avatares

| Autor | Iniciales | Estilo |
|-------|-----------|--------|
| Carlos Rodríguez | CR | Círculo 44px, gradiente `#4F9AFF` → `#14D9E0`, texto blanco |
| Mariana López | ML | 32px, `bg-emerald-100 text-emerald-800` borde emerald |
| David Valenzuela | DV | 28px, `bg-indigo-100 text-indigo-700` |
| Sofía Gómez | SG | 24px, `bg-purple-100 text-purple-700` |
| Usuario actual | 2 primeras letras | 28px, `bg-blue-100 text-[#4F9AFF]` borde blue |

## IDs de Stitch a conservar (QA)

| ID | Uso |
|----|-----|
| `view-forum` | Contenedor de la vista |
| `user-badge` / `header-username` | Alias en header |
| `text-question` | Textarea de nueva pregunta |
| `add_question` | Botón publicar pregunta |
| `main-question-text` | Texto de la pregunta |
| `reply` / `add_reply` | Input y botón de réplica a la pregunta (`q1`) |
| `reply-box-{id}` | Caja desplegable de réplica |
| `btn-like-{id}` / `btn-dislike-{id}` | Botones de voto |
| `counter-{id}-likes` / `counter-{id}-dislikes` | Contadores separados |
| `total-replies-count` | Número de réplicas del hilo |
| `replies-tree` | Contenedor del árbol |

## Estados de interacción (JS en Stitch)

| Acción | Trigger | Resultado |
|--------|---------|-----------|
| **Publicar pregunta** | `#add_question` con texto | Reemplaza `#main-question-text`, resetea votos de `q1`, limpia textarea. Vacío → focus, no publica |
| **Toggle réplica** | "Replicar" | Muestra/oculta `reply-box-{id}` y hace focus al input |
| **Enviar réplica** | "Enviar réplica" / "Responder" | Si hay texto: oculta el box, limpia input, inserta card hija con badge "Respuesta directa" (padre `q1`) o "Sub-réplica escalonada" (padre anidado), incrementa contador. Vacío → focus |
| **Like** | `toggleLike(id)` | Si ya estaba like → quita like. Si no → marca like y quita dislike si existía. Icono pasa a `ph-fill` |
| **Dislike** | `toggleDislike(id)` | Simétrico al like. Mutuamente exclusivo |
| **Usuario** | Sesión | Header y nuevas réplicas usan el alias logueado |

### Reglas de voto (obligatorias)

1. Clic en like con dislike activo → desmarcar dislike y marcar like
2. Clic en like ya activo → desmarcar like
3. Clic en dislike con like activo → desmarcar like y marcar dislike
4. Clic en dislike ya activo → desmarcar dislike
5. Los contadores se actualizan en tiempo real

## Modelo de datos sugerido

```typescript
interface ForumUser {
  displayName: string;
  handle?: string;
  initials: string;
}

interface VoteState {
  liked: boolean;
  disliked: boolean;
  likes: number;
  dislikes: number;
}

interface ForumComment {
  id: string;
  parentId: string | null; // null = pregunta raíz
  author: ForumUser;
  body: string;
  createdLabel: string;
  level: number;
  votes: VoteState;
  children: ForumComment[];
}
```

Renderizar el árbol por `parentId` / `children`, no con HTML estático anidado a mano.

## Dependencias de diseño externas

- **Iconos Phosphor:** `chats-circle`, `chat-teardrop-dots`, `clock`, `paper-plane-right`, `dots-three-vertical`, `thumbs-up`, `thumbs-down`, `arrow-bend-up-left`, `chats`
- **CSS:** Tailwind CSS 4 (tokens existentes) + utilidades `.thread-line`, `.like-active`, `.dislike-active`

## Criterios de aceptación

- [x] Vista localizada y abierta en Stitch
- [x] Screenshot guardado en `documentation/stitch/comments-reference.png`
- [x] HTML de referencia en `documentation/stitch/comments-reference.html`
- [x] Tokens de color y tipografía documentados
- [x] Lista completa de componentes UI identificados
- [x] Estados de interacción y reglas de voto documentados
- [x] Seed canónico definido (sin ruido de prototipo)
