# Ficha de producto — ace-step-ui

## Identidad
- **Nombre:** ACE-Step UI
- **Tipo:** aplicación web local de generación musical con IA (ACE-Step 1.5)
- **Modelo de producto:** herramienta / servicio web (autoalojable)
- **Licencia:** MIT (derivados comerciales permitidos, procedencia del fork declarada)
- **Stack:** React 18 + TypeScript + Vite + Tailwind CSS + SQLite (local-first)

## Qué resuelve
Ofrece una alternativa libre y 100% local a servicios de pago de música con IA (Suno/Udio). Cualquier usuario con GPU puede generar canciones completas con voces en su propio equipo, sin suscripciones, sin nube y con sus datos y audio bajo su control.

## Máximo potencial alcanzable
| Dimensión | Estado actual | Techo |
|-----------|---------------|-------|
| Generación musical local | Funcional (ACE-Step 1.5) | Entrenamiento LoRA por encargo + modelos personalizados |
| Interfaz | Spotify-like, React + Tailwind | App móvil (Expo/React Native) + desktop (Electron/Tauri) |
| Despliegue | Local + servidor opcional en `server/` | GitHub Pages para demo + Vercel para hosting |
| Monetización | No definida | Consultoría de integración, alojamiento gestionado, entrenamiento LoRA, plugins de estudio |
| Idiomas | ES/PT/CA/EN (i18n) | 10+ idiomas |

## Brechas para completar el producto comercial
1. **OFERTA.md**: redactar oferta comercial concreta (pendiente).
2. **precios.json**: definir precios de servicio/consultoría (pendiente).
3. **COBRO.md**: flujo de pago y facturación (pendiente).
4. **ONEPAGER.md**: landing de venta (pendiente).
5. **DEMO.md**: guion de demo grabado (pendiente).
6. **METRICAS.md**: KPIs de adopción y uso (pendiente).
7. **Enlace en README**: apuntar a la landing de producto (pendiente).

## Auditoría interna
- Tests: 3/3 en verde (`npm test`)
- Typecheck: pendiente (`npm run typecheck`)
- Build: pendiente (`npm run build`)
