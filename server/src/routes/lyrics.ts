import { Router } from 'express';

// This route is intentionally server-only: the provider credential never enters Vite's bundle.
const router = Router();
const requestsByIp = new Map<string, { count: number; resetAt: number }>();
const PERIOD_MS = 60_000;
const MAX_PER_IP = 5;

router.post('/', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  const { topic, style } = req.body ?? {};
  if (
    typeof topic !== 'string' || !topic.trim() || topic.length > 400 ||
    typeof style !== 'string' || !style.trim() || style.length > 120
  ) {
    res.status(400).json({ error: 'Provide a topic and style within the allowed length.' });
    return;
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    res.status(503).json({ error: 'Lyrics generation is not configured on this server.' });
    return;
  }

  const now = Date.now();
  const ip = req.ip ?? 'unknown';
  const previous = requestsByIp.get(ip);
  const bucket = previous && previous.resetAt > now
    ? previous
    : { count: 0, resetAt: now + PERIOD_MS };
  if (bucket.count >= MAX_PER_IP) {
    res.setHeader('Retry-After', String(Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))));
    res.status(429).json({ error: 'Too many requests. Please try later.' });
    return;
  }
  bucket.count += 1;
  requestsByIp.set(ip, bucket);
  if (requestsByIp.size > 2000) {
    for (const [clientIp, value] of requestsByIp) {
      if (value.resetAt <= now) requestsByIp.delete(clientIp);
    }
  }

  const model = 'gemini-2.5-flash';
  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          contents: [{ parts: [{ text:
            `Generate a song title, lyrics with [Verse] and [Chorus], and three style tags. Topic: ${topic.trim()}. Style: ${style.trim()}.`
          }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'OBJECT',
              properties: {
                title: { type: 'STRING' },
                lyrics: { type: 'STRING' },
                tags: { type: 'ARRAY', items: { type: 'STRING' } },
              },
              required: ['title', 'lyrics', 'tags'],
            },
          },
        }),
        signal: AbortSignal.timeout(20_000),
      }
    );
    if (!upstream.ok) {
      res.status(502).json({ error: 'Lyrics provider is temporarily unavailable.' });
      return;
    }
    const body = await upstream.json() as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
    };
    const text = body.candidates?.[0]?.content?.parts?.find((part) => part.text)?.text;
    if (!text) throw new Error('Missing structured response');
    const data: unknown = JSON.parse(text);
    if (typeof data !== 'object' || data === null) throw new Error('Invalid response');
    const item = data as { title?: unknown; lyrics?: unknown; tags?: unknown };
    if (
      typeof item.title !== 'string' || item.title.length > 200 ||
      typeof item.lyrics !== 'string' || item.lyrics.length > 20_000 ||
      !Array.isArray(item.tags) || item.tags.length > 10 ||
      !item.tags.every((tag) => typeof tag === 'string' && tag.length <= 80)
    ) {
      throw new Error('Invalid structured content');
    }
    res.json({ title: item.title, lyrics: item.lyrics, tags: item.tags });
  } catch {
    // Do not expose provider errors, prompt content, or credentials in responses or logs.
    res.status(502).json({ error: 'Unable to generate lyrics right now.' });
  }
});

export default router;
