# 15 — Card de pregunta principal

**Dificultad:** Media  
**Estado:** Completado  
**Dependencias:** 12, 13

## Objetivo

Renderizar la card del hilo: badges de tema, autor, cuerpo de la pregunta, acciones y caja de réplica oculta. El árbol de respuestas se conecta en la tarea 17.

## Tareas

- [ ] Cabecera de card:
  - Badge `#DesarrolloWeb` (`bg-primary/15 text-[#2272dc]`)
  - Badge "Discusión Activa" (`bg-gray-100 text-gray-600`)
  - Meta derecha: `ph-clock` + "Hace 2 horas"
- [ ] Bloque autor (`#main-question-block`):
  - Avatar CR 44×44 con gradiente primary → info
  - Nombre "Carlos Rodríguez" + badge "Autor"
  - Meta: `@carlos_dev • Publicado a las 14:30`
  - Botón menú `ph-dots-three-vertical` (visual; sin menú funcional)
- [ ] Cuerpo `#main-question-text` con el seed canónico (no el texto de prototipo)
- [ ] Barra de acciones:
  - Botón Me gusta (`#btn-like-q1`) + `ph-thumbs-up`
  - Botón No me gusta (`#btn-dislike-q1`) + `ph-thumbs-down`
  - Contadores: "Me gusta: 15" (`#counter-q1-likes`) y "No me gusta: 1" (`#counter-q1-dislikes`)
  - Botón "Replicar" (`ph-arrow-bend-up-left`) que abre `#reply-box-q1`
- [ ] Caja de réplica `#reply-box-q1` **oculta por defecto**:
  - Input `#reply` placeholder `"agregar replica"`
  - Botón `#add_reply` "Enviar réplica" + `ph-paper-plane-right`
  - Focus al input al abrir
- [ ] Separador "Hilo de Respuestas (`#total-replies-count`)" + etiqueta "Jerarquía escalonada"
- [ ] Contenedor `#replies-tree` listo para la tarea 17

## Criterios de aceptación

- [ ] Pregunta canónica visible (mutaciones optimistas / árbol DOM)
- [ ] IDs de Stitch de pregunta y réplica a `q1` presentes
- [ ] Reply box oculto hasta clic en Replicar
- [ ] Contadores iniciales 15 / 1
