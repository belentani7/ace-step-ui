import type { Request, Response, NextFunction } from 'express';
import { isIP } from 'node:net';

export function isLoopbackAddress(address: string | undefined): boolean {
  return address === '127.0.0.1' || address === '::1' || address === '::ffff:127.0.0.1';
}

function parseHttpOrigin(origin: string): URL | null {
  try {
    const url = new URL(origin);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password ||
        url.pathname !== '/' || url.search || url.hash || url.origin !== origin) return null;
    return url;
  } catch {
    return null;
  }
}

export function isLoopbackOrigin(origin: string): boolean {
  const url = parseHttpOrigin(origin);
  return url !== null && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
}

export function isDevelopmentOrigin(origin: string): boolean {
  const url = parseHttpOrigin(origin);
  if (!url) return false;
  if (isLoopbackOrigin(origin)) return true;
  const host = url.hostname;
  if (isIP(host) !== 4) return false;
  const octets = host.split('.').map(Number);
  return octets[0] === 10 ||
    (octets[0] === 192 && octets[1] === 168) ||
    (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31);
}

/** Session bootstrap is passwordless: never expose it to a remote browser by default. */
export function requireLocalSessionBootstrap(req: Request, res: Response, next: NextFunction): void {
  if (process.env.ALLOW_LAN_SESSION_BOOTSTRAP === 'true' ||
      (isLoopbackAddress(req.socket.remoteAddress) &&
        (!req.get('origin') || isLoopbackOrigin(req.get('origin')!)))) {
    next();
    return;
  }
  res.status(403).json({ error: 'Session setup is only available on this device.' });
}
