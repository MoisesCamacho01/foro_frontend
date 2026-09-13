# 17 — Árbol jerárquico de réplicas

**Dificultad:** Media-Alta  
**Estado:** Completado  
**Dependencias:** 12, 15

## Objetivo

Renderizar réplicas en escalera (anidadas por `parentId`) y permitir responder en cualquier nivel, ocultando el input tras enviar.

## Comportamiento Stitch

- Clic en **Replicar** → muestra input `placeholder="agregar replica"` + botón enviar
- Envío con texto → oculta input y botón, inserta la card hija
- Padre `q1` → badge "Respuesta directa", sin `ml-8` extra
- Padre anidado → badge "Sub-réplica escalonada", `ml-8 mt-3` + `.thread-line`
- Autor de la nueva réplica = usuario de sesión (iniciales + nombre)
- Meta temporal: "recién publicado"
- Incrementar `#total-replies-count`

## Tareas

- [ ] Componente recursivo `CommentNodeComponent` (o equivalente) que reciba un `ForumComment`
- [ ] Render del seed: Mariana (nivel 1) → David (nivel 2) → Sofía (nivel 3)
- [ ] Badges de nivel según Stitch: "Nivel 1", "Nivel 2 (Sub-réplica)", "Nivel 3"
- [ ] Cada nodo tiene su `reply-box-{id}` oculto, toggle y focus
- [ ] Inputs anidados: `id="reply-input-{id}"` (el de `q1` sigue siendo `#reply`)
- [ ] `submitReply(parentId)` llama a `ForumService.addReply`
- [ ] Texto vacío → focus, no inserta nodo
- [ ] Indentación creciente (`pl-6` + `ml-8` por nivel) y líneas `.thread-line`
- [ ] No copiar las réplicas de prototipo de Alex Rivera del HTML exportado
- [ ] Accesibilidad: `aria-expanded` en Replicar, `aria-live` al añadir réplica

## Criterios de aceptación

- [ ] Tres niveles del seed visibles con líneas de árbol
- [ ] Se puede replicar a la pregunta y a cualquier réplica
- [ ] Tras enviar, el box se oculta y el nuevo nodo aparece bajo el padre
- [ ] El contador de hilo suma 1 por réplica nueva
- [ ] Sin HTML estático duplicado por cada nivel
