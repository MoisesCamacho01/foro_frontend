# 08 — Pruebas QA con Playwright

**Dificultad:** Alta  
**Estado:** Completado  
**Dependencias:** 05, 06, 07

## Objetivo

Validar funcionalidad y fidelidad visual de la vista de login comparándola con el diseño de Stitch.

## Tareas

### Pruebas funcionales

- [x] La ruta `/login` carga correctamente
- [x] Header muestra "ForumHub" y badge "Portal de Acceso"
- [x] Badge "Servidor en línea" visible
- [x] Campo alias tiene autofocus al cargar
- [x] Submit vacío muestra error "Por favor ingresa un nombre de usuario válido."
- [x] Submit con alias válido muestra estado loading ("Validando acceso...")
- [x] Tras éxito: botón verde, banner "¡Acceso verificado con éxito!"
- [x] Alias guardado en `localStorage` como `forumhub_user`
- [x] Botón deshabilitado durante loading
- [x] No se puede enviar doble submit

### Pruebas visuales (comparación con Stitch)

- [x] Screenshot de la vista implementada
- [x] Comparar con `documentation/stitch/login-reference.png`
- [x] Verificar colores: Primary `#4F9AFF`, Secondary `#5BFF4F`, Danger `#D60F1C`
- [x] Verificar tipografía, espaciado y sombras de card
- [x] Verificar header sticky, card centrada y footer con paleta
- [x] Verificar iconos Phosphor renderizados
- [x] Verificar estados: error, loading, success

### Entregable

- [x] Guardar resumen en `documentation/qa-login-resumen.md`
- [x] Incluir screenshots lado a lado (Stitch vs implementación)
- [x] Listar discrepancias encontradas y su resolución

## Criterios de aceptación

- [x] Todas las pruebas funcionales pasan
- [x] Diferencia visual con Stitch < umbral aceptable
- [x] Resumen QA documentado en `/documentation`
- [x] Si hay fallos, volver a tareas 05/06 y corregir
