# AUDITORIA_ESTADO — ace-step-ui

> Repositorio físico: `belentani-ecosystem/arte-musica/ace-step-ui`

## Situación actual

| Indicador | Valor |
|-----------|-------|
| Categoría | arte-musica |
| Lenguaje | JavaScript |
| Rama | main |
| package.json | Sí |
| Python | No |
| Docker | No |
| README | Sí |
| AGENTS.md | No |
| Tests | No |
| CI | No |

## Comentarios

- UI profesional para ACE-Step 1.5 (alternativa open source a Suno).
- Falta AGENTS.md, CI y tests.

## Comando para arreglar y elevar

```bash
npm install
npm run dev
npm run build
npm run test  # crear si no existe
# Crear AGENTS.md con reglas del ecosistema belentani7
# Crear .github/workflows/ci.yml
gitleaks detect --source .
