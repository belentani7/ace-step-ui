import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const config = readFileSync(new URL('../vite.config.ts', import.meta.url), 'utf8');
const lyricsService = readFileSync(new URL('../services/geminiService.ts', import.meta.url), 'utf8');

test('the HTML references an existing icon and no removed stylesheet', () => {
  assert.match(html, /href="\/favicon\.svg"/);
  assert.ok(existsSync(new URL('../public/favicon.svg', import.meta.url)));
  assert.doesNotMatch(html, /href="\/index\.css"/);
});

test('the client build does not define server-only environment values', () => {
  assert.doesNotMatch(config, /\bloadEnv\s*\(/);
  assert.doesNotMatch(config, /^\s*define\s*:/m);
  assert.match(lyricsService, /fetch\(['"]\/api\/lyrics['"]/);
  assert.doesNotMatch(lyricsService, /process\.env|@google\/genai/);
});
