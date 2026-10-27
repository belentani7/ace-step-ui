import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isLoopbackAddress,
  isLoopbackOrigin,
  isDevelopmentOrigin,
  requireLocalSessionBootstrap,
} from '../dist/middleware/localSession.js';
import { createSessionSecret } from '../dist/config/sessionSecret.js';

function exercise(remoteAddress, origin, optIn = false) {
  const previous = process.env.ALLOW_LAN_SESSION_BOOTSTRAP;
  if (optIn) process.env.ALLOW_LAN_SESSION_BOOTSTRAP = 'true';
  else delete process.env.ALLOW_LAN_SESSION_BOOTSTRAP;
  let status = 200;
  let body;
  let next = 0;
  const req = { socket: { remoteAddress }, get: (name) => name === 'origin' ? origin : undefined };
  const res = { status(value) { status = value; return this; }, json(value) { body = value; return this; } };
  try {
    requireLocalSessionBootstrap(req, res, () => { next += 1; });
    return { status, body, next };
  } finally {
    if (previous === undefined) delete process.env.ALLOW_LAN_SESSION_BOOTSTRAP;
    else process.env.ALLOW_LAN_SESSION_BOOTSTRAP = previous;
  }
}

test('session setup is restricted to loopback requests and trusted local origins', () => {
  for (const address of ['127.0.0.1', '::1', '::ffff:127.0.0.1']) {
    assert.equal(isLoopbackAddress(address), true);
    assert.equal(exercise(address, 'http://localhost:3000').next, 1);
  }
  assert.equal(exercise('192.168.1.10', 'http://localhost:3000').status, 403);
  assert.equal(exercise('127.0.0.1', 'https://localhost.attacker.example').status, 403);
  assert.equal(exercise('127.0.0.1', 'http://192.168.1.20:3000').status, 403);
  assert.equal(exercise('127.0.0.1', undefined).next, 1);
  assert.equal(exercise('192.168.1.10', 'http://192.168.1.20:3000', true).next, 1);
});

test('development CORS never trusts deceptive hostnames', () => {
  for (const origin of ['http://localhost:3000', 'http://127.0.0.1:5173', 'http://192.168.1.20:3000', 'http://10.0.0.2:3000', 'http://172.31.2.3:3000']) {
    assert.equal(isDevelopmentOrigin(origin), true, origin);
  }
  for (const origin of ['https://localhost.attacker.example', 'http://192.168.1.20.evil.test', 'https://example.com/?localhost', 'file:///tmp/test', 'http://172.32.0.1:3000', 'http://8.8.8.8:3000']) {
    assert.equal(isDevelopmentOrigin(origin), false, origin);
  }
  assert.equal(isLoopbackOrigin('http://localhost:3000'), true);
  assert.equal(isLoopbackOrigin('https://localhost.attacker.example'), false);
});

test('JWT secret is unpredictable unless an explicitly strong value is supplied', () => {
  const first = createSessionSecret();
  const second = createSessionSecret('ace-step-ui-local-secret');
  assert.equal(first.length, 64);
  assert.equal(second.length, 64);
  assert.notEqual(first, second);
  const strong = 'x'.repeat(64);
  assert.equal(createSessionSecret(strong), strong);
});
