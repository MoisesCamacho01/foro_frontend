# 18 — Votos me gusta / no me gusta

**Dificultad:** Alta  
**Estado:** Completado  
**Dependencias:** 15, 17

## Objetivo

Implementar like/dislike mutuamente exclusivos en pregunta y réplicas, con contadores en tiempo real e iconos fill cuando están activos.

## Reglas (copiadas del JS de Stitch)

1. Clic en **me gusta** con **no me gusta** activo → desmarcar dislike, marcar like
2. Clic en **me gusta** ya activo → desmarcar like
3. Clic en **no me gusta** con **me gusta** activo → desmarcar like, marcar dislike
4. Clic en **no me gusta** ya activo → desmarcar dislike
5. Los contadores cambian al instante

## Tareas

- [ ] Conectar botones `#btn-like-{id}` y `#btn-dislike-{id}` al `ForumService`
- [ ] Pregunta y réplicas del seed usan contadores separados (`counter-{id}-likes` / `counter-{id}-dislikes`)
- [ ] Réplicas nuevas pueden usar el mismo esquema de dos contadores (preferible a unificar en "Votos:" del HTML dinámico de Stitch, que es inconsistente)
- [ ] Clases `like-active` / `dislike-active` en el botón activo
- [ ] Icono: `ph` → `ph-fill` cuando el voto propio está activo
- [ ] Hover: like `hover:border-[#4F9AFF] hover:bg-blue-50`; dislike `hover:border-[#D60F1C] hover:bg-red-50`
- [ ] `title` / `aria-pressed` en los botones
- [ ] Publicar una pregunta nueva resetea votos de `q1` a 0/0 (como Stitch)
- [ ] Estado de voto propio inicial: ninguno marcado (los números del seed son del hilo, no del usuario actual)

## Criterios de aceptación

- [ ] Like y dislike no pueden estar activos a la vez en el mismo nodo
- [ ] Toggle off restaura el contador
- [ ] Cambiar de like a dislike (y viceversa) actualiza ambos contadores
- [ ] Visual activo coincide con Stitch (azul / rojo)
- [ ] Funciona en pregunta y en todos los niveles de réplica
