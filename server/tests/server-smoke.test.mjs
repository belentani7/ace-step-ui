import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { once } from 'node:events';
import test from 'node:test';

async function availablePort() {
  const listener = createServer();
  listener.listen(0, '127.0.0.1');
  await once(listener, 'listening');
  const { port } = listener.address();
  await new Promise((done) => listener.close(done));
  return port;
}

test('compiled API serves the health endpoint with a temporary database', async () => {
  const port = await availablePort();
  const temp = mkdtempSync(join(tmpdir(), 'ace-step-api-smoke-'));
  const output = [];
  const child = spawn(process.execPath, ['dist/index.js'], {
    cwd: resolve(import.meta.dirname, '..'),
    env: {
      ...process.env,
      PORT: String(port),
      NODE_ENV: 'test',
      DATABASE_PATH: join(temp, 'test.db'),
      JWT_SECRET: randomBytes(32).toString('hex'),
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout.on('data', (chunk) => output.push(String(chunk).slice(0, 500)));
  child.stderr.on('data', (chunk) => output.push(String(chunk).slice(0, 500)));

  try {
    let response;
    for (let attempt = 0; attempt < 100; attempt += 1) {
      if (child.exitCode !== null) break;
      try {
        response = await fetch('http://127.0.0.1:' + port + '/health', {
          signal: AbortSignal.timeout(300),
        });
        if (response.ok) break;
      } catch {}
      await new Promise((done) => setTimeout(done, 100));
    }
    assert.ok(response?.ok, 'API did not start: ' + output.join('').slice(-1000));
    const body = await response.json();
    assert.deepEqual(body, { status: 'ok', service: 'ACE-Step UI API' });
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  } finally {
    child.kill('SIGTERM');
    if (child.exitCode === null) {
      await Promise.race([
        once(child, 'exit'),
        new Promise((done) => setTimeout(done, 1500)),
      ]);
    }
    if (child.exitCode === null) child.kill('SIGKILL');
    rmSync(temp, { recursive: true, force: true });
  }
});
