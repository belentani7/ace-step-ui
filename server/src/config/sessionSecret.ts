import { randomBytes } from 'node:crypto';

/** Never ship a predictable JWT signing key, including on local-first installations. */
export function createSessionSecret(configured?: string): string {
  const secret = configured?.trim();
  if (secret && secret.length >= 32) return secret;
  // A missing or weak key creates ephemeral sessions, not forgeable tokens.
  return randomBytes(32).toString('hex');
}
