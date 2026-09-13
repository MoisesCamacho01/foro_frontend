# 14 — Formulario de nueva pregunta

**Dificultad:** Media  
**Estado:** Completado  
**Dependencias:** 12, 13

## Objetivo

Implementar la card "Crear una nueva pregunta" con textarea, validación y publicación según Stitch.

## IDs de Stitch

- Textarea: `id="text-question"`
- Botón: `id="add_question"`

## Tareas

- [ ] Header de card:
  - Icono `ph-chat-teardrop-dots` en cuadrado 32×32 `bg-primary/15 text-[#2272dc]`
  - Título: "Crear una nueva pregunta"
  - Subtítulo de card: "Publica inquietudes y participa en hilos de respuestas escalonadas"
  - Badge derecho: punto verde + "Comunidad Activa"
- [ ] Textarea Reactive Forms:
  - `rows="3"`, `resize-none`
  - Placeholder: "¿Qué te gustaría debatir o consultar con la comunidad hoy?"
  - Validación `required` + trim
- [ ] Fila inferior:
  - Izquierda: `ph-clock` + "Respuesta promedio en menos de 15 min"
  - Derecha: botón "Publicar Pregunta" + `ph-paper-plane-right`
- [ ] `onSubmit` / `handleAddQuestion`:
  - Vacío → focus en textarea, no publicar
  - Válido → `ForumService.addQuestion()`, limpiar el campo
  - El texto publicado reemplaza `#main-question-text` (tarea 15)
- [ ] No usar `alert()` de Stitch; si se muestra feedback, usar un banner discreto en la propia card (opcional)
- [ ] `aria-label` en textarea y botón

## Criterios de aceptación

- [ ] IDs `text-question` y `add_question` presentes
- [ ] No se publica texto vacío
- [ ] Tras publicar, el textarea queda vacío y la pregunta principal se actualiza
- [ ] Tipado estricto, sin `any`
