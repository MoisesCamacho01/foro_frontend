# 12 — Modelos y servicio mock de comentarios

**Dificultad:** Media  
**Estado:** Completado  
**Dependencias:** 10, 11

## Objetivo

Definir el modelo de árbol (`parentId` / `children`) y un servicio mock que sirva el hilo canónico y mute preguntas, réplicas y votos en memoria.

## Referencia

Ver seed, IDs y reglas en [10-analisis-vista-comentarios.md](./10-analisis-vista-comentarios.md).

## Tareas

- [ ] Crear interfaces en `src/app/core/models/forum.model.ts` (o junto al servicio):
  - `ForumUser`, `VoteState`, `ForumComment`
- [ ] Crear `ForumService` en `src/app/core/services/forum.service.ts`
- [ ] Sembrar el hilo canónico (`q1` → `r1` → `r1_1` → `r1_1_1`) con votos iniciales de Stitch
- [ ] API del servicio (observables, sin `any`):

```typescript
getThread(): Observable<ForumComment>
addQuestion(body: string, author: ForumUser): Observable<ForumComment>
addReply(parentId: string, body: string, author: ForumUser): Observable<ForumComment>
toggleLike(id: string): Observable<VoteState>
toggleDislike(id: string): Observable<VoteState>
```

- [ ] `addQuestion` actualiza el cuerpo de la pregunta raíz y resetea votos de `q1` (como `handleAddQuestion` en Stitch)
- [ ] `addReply` inserta el nodo como hijo del padre, con `level = parent.level + 1`
- [ ] Votos mutuamente exclusivos implementados en el servicio (no solo en la UI)
- [ ] Usar `signal` o un `BehaviorSubject` para que la vista se actualice al mutar el árbol
- [ ] Delay corto opcional (p. ej. 200–400 ms) para simular red; no bloquear la UI de réplicas (Stitch es inmediato)

## Criterios de aceptación

- [ ] El seed coincide con el hilo canónico de la tarea 10
- [ ] Añadir réplica incrementa `children` del padre correcto
- [ ] Like/dislike no pueden estar activos a la vez
- [ ] Servicio inyectable y testeable
- [ ] Tipado estricto en todos los métodos
