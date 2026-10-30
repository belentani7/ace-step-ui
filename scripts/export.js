#!/usr/bin/env node
/**
 * Export del proyecto (Protocolo 11 — Ecosistema Belentani).
 *
 * Genera un JSON con los datos principales de ace-step-ui para consumo
 * por otras herramientas del ecosistema: metadatos, estilos musicales,
 * idiomas i18n, rutas del servidor Express y noticias.
 *
 * Uso:
 *   node scripts/export.js              # imprime el JSON en stdout
 *   node scripts/export.js --out f.json # además lo guarda en f.json
 *
 * Nota: se usa import() dinámico dentro de una IIFE para que el archivo
 * pase `node --check` independientemente de cómo el motor parsee .js,
 * y funcione en runtime con "type": "module" (package.json).
 */
(async () => {
  const { readFileSync, readdirSync, writeFileSync } = await import('node:fs');
  const { fileURLToPath } = await import('node:url');
  const path = await import('node:path');

  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const read = (rel) => readFileSync(path.join(root, rel), 'utf8');

  // Metadatos del proyecto
  const pkg = JSON.parse(read('package.json'));
  const meta = JSON.parse(read('metadata.json'));

  // Estilos musicales (data/genres.ts los carga como texto plano con ?raw)
  const splitStyles = (rel) => read(rel).split('\n').map((l) => l.trim()).filter(Boolean);
  const mainStyles = splitStyles('data/main_style.txt');
  const allStyles = splitStyles('data/all_style.txt');
  const mainLower = new Set(mainStyles.map((s) => s.toLowerCase()));
  const subStylesCount = allStyles.filter((s) => !mainLower.has(s.toLowerCase())).length;

  // Idiomas soportados por i18n/translations.ts
  const langMatch = read('i18n/translations.ts').match(/export type Language = ([^;]+);/);
  const languages = langMatch
    ? (langMatch[1].match(/'([^']+)'/g) || []).map((s) => s.slice(1, -1))
    : [];

  // Rutas del servidor Express
  const routes = readdirSync(path.join(root, 'server/src/routes'), { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.ts'))
    .map((e) => `server/src/routes/${e.name}`)
    .sort();

  // Noticias del proyecto
  const news = JSON.parse(read('data/news.json'));

  const data = {
    exportedAt: new Date().toISOString(),
    project: {
      name: pkg.name,
      version: pkg.version,
      description: meta.description,
      license: 'MIT',
      forkOf: 'fspecii/ace-step-ui',
    },
    music: {
      mainStyles,
      mainStylesCount: mainStyles.length,
      allStylesCount: allStyles.length,
      subStylesCount,
    },
    i18n: { languages },
    server: { routes },
    news,
  };

  const outIndex = process.argv.indexOf('--out');
  if (outIndex !== -1 && process.argv[outIndex + 1]) {
    const outFile = path.resolve(process.argv[outIndex + 1]);
    writeFileSync(outFile, JSON.stringify(data, null, 2) + '\n');
    console.error(`exportado a ${outFile}`);
  }

  console.log(JSON.stringify(data, null, 2));
})();
