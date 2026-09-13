# 01 — Configurar alias `@src/`

**Dificultad:** Baja  
**Estado:** Pendiente  
**Dependencias:** Ninguna

## Objetivo

Configurar el alias de importación `@src/` en TypeScript y Angular para cumplir con las reglas del proyecto.

## Tareas

- [ ] Agregar `paths` en `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@src/*": ["src/*"]
    }
  }
}
```

- [ ] Verificar que `tsconfig.app.json` hereda la configuración
- [ ] Probar importación: `import { X } from '@src/app/...'`

## Criterios de aceptación

- [ ] Imports con `@src/` compilan sin errores
- [ ] El IDE resuelve correctamente las rutas
