# ace-step-ui — instrucciones para agentes

## Reglas de seguridad (obligatorias)

- Antes de cambiar nada, revisa `git status`. No descartes ni sobrescribas cambios sin commit que no hayas hecho tú.
- No borres carpetas (`node_modules`, `dist`, `.venv`, etc.) ni ficheros de datos sin preguntar.
- No hagas `git push`, `git reset --hard` ni despliegues sin que el usuario lo pida explícitamente.
- Haz cambios pequeños y verificables; ejecuta solo las comprobaciones que cubran el cambio.

## Stack

- Frontend: React + TypeScript, bundler Vite (`App.tsx`, `components/`, `context/`).
- Servidor de desarrollo opcional en `server/` (Node + tsx).
- Estado y auditoría del repo: `AUDITORIA-ESTADO-Y-PLAN.md`.

## Comandos

- `npm install` — instalar dependencias.
- `npm run dev` — servidor local Vite.
- `npm run typecheck` — comprobación de tipos (`tsc --noEmit`).
- `npm test` — tests de frontend (`node --test tests/frontend-basics.test.mjs`).
- `npm run build` — build de producción (`vite build`).
