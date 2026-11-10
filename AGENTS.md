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

<!-- repo-forge:agents:inicio -->
# AGENTS.md — instrucciones para agentes

Cualquier agente que toque **ACE Step UI** debe:

1. Leer `BIBLIA.md` y `plataforma/FICHA.md` antes de escribir.
2. Ejecutar `python scripts/doctor.py` al empezar y al terminar.
3. Respetar el techo de alcance: no añadir módulos que la ficha no describa.
4. No borrar archivos, no reescribir historia, no hacer push sin pedido explícito.
5. Declarar en el informe qué se ejecutó y qué no; lo no ejecutado no se afirma.

## Comandos seguros

| Comando | Efecto |
|---|---|
| `python scripts/doctor.py` | Solo lectura; devuelve el estado de reglas |
| `python -m unittest discover -s tests` | Pruebas locales |

<!-- repo-forge:agents -->
<!-- repo-forge:agents:fin -->
