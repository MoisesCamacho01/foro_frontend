# 16 — Estilizar vista con Tailwind

**Dificultad:** Media  
**Estado:** Completado  
**Dependencias:** 10, 13, 14, 15

## Objetivo

Aplicar estilos Tailwind para que la vista de comentarios sea **idéntica** al diseño de Stitch.

## Referencia de tokens

Ver `documentation/stitch/comments-reference.html` y análisis en tarea `10`. Reutilizar `@theme` de `src/styles.css`.

## Tareas

- [ ] Añadir utilidad de sombra de esta vista si difiere del login (`0 10px 25px -5px #F2F2F2, 0 8px 10px -6px #F2F2F2`)
- [ ] Estilos `.thread-line::before` / `::after` (color `#E2E8F0`) — pueden vivir en `styles.css` o en el componente
- [ ] Estilos `.like-active` y `.dislike-active` según Stitch
- [ ] **Header:** sticky, sombra sutil, badge cyan, badge usuario `bg-slate-50`
- [ ] **Cards:** `rounded-2xl`, borde `#EDEDED`, padding `p-6` (pregunta) / `p-7` (hilo)
- [ ] **Textarea:** `bg-gray-50`, `rounded-xl`, focus ring `#4F9AFF`
- [ ] **Botón publicar:** `bg-[#4F9AFF] hover:bg-[#3884ea] rounded-xl text-xs font-semibold`
- [ ] **Avatares** con tamaños y colores por nivel (ver tarea 10)
- [ ] **Réplicas:** fondo `bg-gray-50/70`, hover `bg-white hover:shadow-sm`; nivel 3 con borde `border-blue-100`
- [ ] **Botones de voto:** borde gris, hover primary/danger; icono `ph-fill` cuando activos
- [ ] Comparar lado a lado con `documentation/stitch/comments-reference.png`

## Criterios de aceptación

- [ ] Colores coinciden con tokens de Stitch
- [ ] Espaciado, bordes y sombras coinciden con el diseño
- [ ] Líneas de árbol visibles en réplicas anidadas
- [ ] Iconos Phosphor renderizados (regular y fill)
- [ ] Vista visualmente alineada con el screenshot de referencia
