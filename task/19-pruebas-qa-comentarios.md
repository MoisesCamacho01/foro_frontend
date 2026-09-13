# 19 — Pruebas QA con Playwright

**Dificultad:** Alta  
**Estado:** Completado  
**Dependencias:** 16, 17, 18

## Objetivo

Validar funcionalidad y fidelidad visual de la vista de comentarios comparándola con el diseño de Stitch.

## Tareas

### Pruebas funcionales

- [ ] Sin sesión, `/foro` redirige a `/login`
- [ ] Login + sesión muestra `/foro` con el alias en `#header-username`
- [ ] Header: "ForumHub", badge "Comunidad Activa", breadcrumb "Hilo de discusión"
- [ ] Título "Preguntas de la Comunidad" y badge "12 Usuarios en línea"
- [ ] Publicar pregunta vacía no cambia `#main-question-text`
- [ ] Publicar pregunta con texto actualiza `#main-question-text` y limpia `#text-question`
- [ ] Reply box de `q1` está oculto al cargar y se muestra al clic en Replicar
- [ ] Enviar réplica vacía no crea nodo
- [ ] Enviar réplica a `q1` añade una "Respuesta directa" y suma el contador
- [ ] Enviar réplica a un nodo hijo añade "Sub-réplica escalonada" anidada
- [ ] Like en `q1` activa estilo primary y suma likes
- [ ] Like de nuevo desmarca y resta
- [ ] Dislike con like activo desmarca like y marca dislike
- [ ] Seed visible: Carlos, Mariana, David, Sofía

### Pruebas visuales (comparación con Stitch)

- [ ] Screenshot full page de `/foro`
- [ ] Comparar con `documentation/stitch/comments-reference.png`
- [ ] Colores: Primary `#4F9AFF`, Secondary `#5BFF4F`, Danger `#D60F1C`, Info `#14D9E0`
- [ ] Header sticky, dos cards, footer con paleta
- [ ] Líneas de árbol en réplicas
- [ ] Iconos Phosphor renderizados
- [ ] Estados: reply box abierto, like activo, dislike activo

### Entregable

- [ ] Spec en `e2e/qa-comentarios.spec.ts`
- [ ] Resumen en `documentation/qa-comentarios-resumen.md`
- [ ] Screenshots en `documentation/qa-screenshots/`
- [ ] Incluir comparación lado a lado (Stitch vs implementación)

## Criterios de aceptación

- [ ] Todas las pruebas funcionales pasan
- [ ] Diferencia visual con Stitch bajo umbral aceptable
- [ ] Resumen QA documentado en `/documentation`
- [ ] Si hay fallos, volver a tareas 16/17/18 y corregir
