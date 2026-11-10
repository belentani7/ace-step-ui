# Contribuir

Gracias por tu interés en contribuir a este proyecto del ecosistema Pedro Belentani.

## Cómo contribuir

1. Haz fork del repositorio y crea tu rama desde `main`:
   `git checkout -b feature/mi-mejora`
2. Instala las dependencias del proyecto (consulta el `README.md`).
3. Haz tus cambios con commits claros y pequeños.
4. Añade o actualiza tests cuando toque.
5. Abre un Pull Request describiendo el cambio y cómo probarlo.

## Reglas del ecosistema

* Sigue el catálogo oficial de reglas (`_meta/reglas-oficiales.md`).
* No subas secretos ni claves (GH-10).
* Sé respetuoso conforme al Código de Conducta.

## Reportar bugs

Abre un issue usando la plantilla de bug; incluye pasos para reproducir.

<!-- repo-forge:contributing:inicio -->
# Contribuir

## Antes de tocar nada

1. Lee `BIBLIA.md` (doctrina del repositorio) y `plataforma/FICHA.md` (alcance permitido).
2. Ejecuta `python scripts/doctor.py` y guarda la salida: es la línea base.
3. Un cambio resuelve **un solo resultado verificable**.

## Cómo enviar

```bash
git checkout -b fix/<asunto-corto>
# ... cambio mínimo ...
python scripts/doctor.py
git commit -m "fix(alcance): <qué se arregla>"
```

Convención de commit: `type(scope): resumen` con tipos `feat|fix|docs|chore|refactor|test|perf`.

## Qué no se acepta

- Cambios que rompan una regla del catálogo sin justificar la excepción.
- Archivos generados a mano que el build regenera.
- Datos personales, credenciales o capturas de clientes.
- Promesas en el README que el código no cumpla.

<!-- repo-forge:contributing -->
<!-- repo-forge:contributing:fin -->
