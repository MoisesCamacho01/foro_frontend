# 13 — Crear layout del foro

**Dificultad:** Media  
**Estado:** Completado  
**Dependencias:** 10, 11

## Objetivo

Construir la estructura HTML de la vista de comentarios según Stitch: header autenticado, main con título y dos cards, footer con paleta.

## Referencia Stitch

Ver análisis en [10-analisis-vista-comentarios.md](./10-analisis-vista-comentarios.md) y HTML en `documentation/stitch/comments-reference.html`.

## Tareas

- [ ] Implementar `ForumComponent` standalone con template en archivo aparte
- [ ] Semántica: `<header>`, `<main>`, `<section>`, `<footer>`
- [ ] **Header sticky** (`h-16`, fondo blanco, borde `#F2F2F2`):
  - Logo azul 40×40 con `ph-chats-circle`
  - Texto "ForumHub" + badge "Comunidad Activa" (cyan `#14D9E0`)
  - Breadcrumb `Foro / Hilo de discusión` (`hidden md:flex`)
  - Badge usuario: punto verde + alias (`#user-badge`, `#header-username`)
- [ ] **Main** `max-w-5xl w-full mx-auto p-6`:
  - Título "Preguntas de la Comunidad" (un solo `h1`)
  - Subtítulo: "Publica inquietudes y participa en hilos de respuestas escalonadas"
  - Badge "12 Usuarios en línea"
- [ ] **Card 1 placeholder:** "Crear una nueva pregunta" (estructura; formulario en tarea 14)
- [ ] **Card 2 placeholder:** zona del hilo (detalle en tareas 15 y 17)
- [ ] **Footer:** swatches Primary / Secondary / Danger / Info / Warning + "Estado: Reglas y jerarquía activas" + "Fondo #FCFCFC | Card #FFFFFF"
- [ ] `id="view-forum"` en el `<section>` principal
- [ ] Sin lógica de votos ni réplicas todavía

## Estructura base

```html
<div class="min-h-screen flex flex-col">
  <header><!-- logo, breadcrumb, usuario --></header>
  <main class="flex-grow max-w-5xl w-full mx-auto p-6">
    <section id="view-forum" class="w-full space-y-6">
      <div><!-- título + usuarios en línea --></div>
      <article><!-- card nueva pregunta --></article>
      <article><!-- card hilo --></article>
    </section>
  </main>
  <footer><!-- paleta + estado --></footer>
</div>
```

## Criterios de aceptación

- [ ] Header, main y footer coinciden con las zonas de Stitch
- [ ] Alias visible en el header
- [ ] HTML semántico y accesible
- [ ] Breadcrumb oculto en viewport estrecho
