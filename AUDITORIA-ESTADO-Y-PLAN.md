# Auditoría, situación y plan de elevación — `ace-step-ui`

Generado 2026-11-03 por el pase de reglas del ecosistema (catálogo `_meta/reglas-oficiales.md`).
Todo lo afirmado aquí sale de datos reales: base de consolidación, gate oficial y git.

- **Categoría:** arte-musica · **Ruta:** `C:\Users\USER\belentani-ecosystem\arte-musica\ace-step-ui`
- **Remoto:** https://github.com/belentani7/ace-step-ui.git · **Rama:** main · **HEAD:** d0f1089 (docs(auditoria): estado real del repo, comandos para arreglar/elevar y potencial)
- **Lenguajes:** .ts:33,.js:32,.tsx:30,.json:9,.html:7,.py:5 · **Commits (git real):** 74 · **Tamaño worktree:** 122.9 MB
- **Visibilidad GitHub:** public · **Homepage:** (ninguna) · **HTTP:** —
- **GitHub Pages:** no activo

## 1. Situación actual

- **Consolidación:** familia `proyecto-acestepui` · acción survivor (estable).
- **Git:** 3 ficheros sin commitear · 6 commits sin push · 5 commits del pase de reglas (desde 2026-11-02).
- **Reglas web (gate oficial):** 7 HTML · **0 hallazgos** · 0 títulos duplicados.
- **Gobernanza GitHub (protocolo MS):** 11/11 reglas aplicadas · completo.
- **Secretos (triaje):** sin hallazgos.

## 2. Comandos para arreglar y elevar (ejecutar en este orden)

1. **Reglas web: ya cumplidas (0 hallazgos).** Barrera continua:
   ```powershell
   python C:\Users\USER\belentani-ecosystem\_meta\check_web_rules.py ace-step-ui
   ```
2. **Publicar en GitHub Pages** (repo público; la cuenta free solo publica repos públicos):
   ```powershell
   gh api -X POST repos/belentani7/ace-step-ui/pages -f source[branch]=main -f source[path]=/
   gh api -X POST repos/belentani7/ace-step-ui/pages/builds/latest -X POST 2>$null   # o dejar que el workflow publique
   ```
3. **Limpiar 3 ficheros sin commitear** (revisar antes; si son del pase de reglas, commitear):
   ```powershell
   git -C "C:\Users\USER\belentani-ecosystem\arte-musica\ace-step-ui" status --short
   git -C "C:\Users\USER\belentani-ecosystem\arte-musica\ace-step-ui" add -- <solo los ficheros del pase> ; git -C "C:\Users\USER\belentani-ecosystem\arte-musica\ace-step-ui" commit -m "fix(web-rules): ..."
   ```
4. **Subir al remoto** (requiere tu confirmación explícita; hoy ningún repo tiene push):
   ```powershell
   git -C "C:\Users\USER\belentani-ecosystem\arte-musica\ace-step-ui" push origin main
   ```

## 3. Qué puede alcanzar este repositorio

- **Repositorio público**: puede publicar gratis en GitHub Pages (`https://belentani7.github.io/ace-step-ui/`) y mantener Vercel; hoy tiene Pages desactivado
- Sitio pequeño pero válido: con gobernanza GH-01..10 completa y CI quedaría listo como producto público.

---
*Evidencia: `_meta/consolidacion/consolidacion.db` · `_meta/specs/2026-11-01-*` · gate `check_web_rules.py` · git log. Regenerable con `python _meta/gen_auditoria_repos.py`.*
