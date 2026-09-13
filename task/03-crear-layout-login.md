# 03 — Crear layout del login

**Dificultad:** Media  
**Estado:** Pendiente  
**Dependencias:** 00, 02

## Objetivo

Construir la estructura HTML del layout de login según el diseño de Stitch, sin lógica de formulario aún.

## Referencia Stitch

Ver análisis completo en [00-analisis-vista-login.md](./00-analisis-vista-login.md) y HTML en `documentation/stitch/login-reference.html`.

## Tareas

- [ ] Crear sub-componentes o secciones dentro de `LoginComponent`:
  - [ ] `login-header` — barra superior sticky
  - [ ] `login-card` — card central del formulario
  - [ ] `login-footer` — footer con paleta de colores
- [ ] **Header sticky** (`h-16`, fondo blanco, borde `#F2F2F2`):
  - Logo: cuadrado azul 40×40 con icono `chats-circle`
  - Texto "ForumHub" + badge "Portal de Acceso" (cyan)
  - Badge derecho "Servidor en línea" (verde con punto pulsante)
- [ ] **Main centrado** (`min-h-[calc(100vh-120px)]`, flex center):
  - Card `max-w-md` con `rounded-2xl p-8 sm:p-10`
- [ ] **Card — sección bienvenida**:
  - Icono `user-circle` en cuadrado azul claro 80×80 con badge check verde
  - Título: "¡Bienvenido a ForumHub!"
  - Subtítulo: "Ingresa tu alias para participar..."
- [ ] **Card — formulario** (placeholder):
  - Label "Ingresa un nombre de usuario"
  - Input con icono `@` a la izquierda
  - Botón "Acceder al foro" con flecha
- [ ] **Card — features** (borde superior):
  - "Sin contraseña requerida" (icono `shield-check` cyan)
  - "Acceso instantáneo" (icono `lightning` amarillo)
- [ ] **Footer** con swatches de paleta y "ForumHub v2.0"
- [ ] Usar semántica HTML: `<header>`, `<main>`, `<form>`, `<footer>`, `<label>`, `<button type="submit">`

## Estructura base

```html
<div class="min-h-screen flex flex-col">
  <header><!-- logo + badges --></header>
  <main class="flex-grow flex items-center justify-center">
    <section class="w-full max-w-md">
      <div class="custom-card rounded-2xl p-8">
        <header><!-- icono + título + subtítulo --></header>
        <form><!-- input alias + botón --></form>
        <footer><!-- features --></footer>
      </div>
    </section>
  </main>
  <footer><!-- paleta + versión --></footer>
</div>
```

## Criterios de aceptación

- [ ] Layout coincide con la estructura de Stitch (header + card + footer)
- [ ] Tres zonas claramente diferenciadas
- [ ] HTML semántico y accesible (roles ARIA básicos)
- [ ] Sin lógica de formulario (solo estructura)
