// Loaded only in the child process running the integration test.
// Prevents all outbound provider network traffic and verifies server-only auth.
globalThis.fetch = async (url, options) => {
  if (String(url) !== 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent') {
    throw new Error('Unexpected external request');
  }
  if (options?.headers?.['x-goog-api-key'] !== 'server-test-key') {
    throw new Error('Credential header missing');
  }
  const prompt = JSON.parse(options.body);
  if (!Array.isArray(prompt.contents) || !prompt.generationConfig?.responseSchema) {
    throw new Error('Invalid provider request body');
  }
  return new Response(JSON.stringify({
    candidates: [{ content: { parts: [{ text: JSON.stringify({
      title: 'Original Test',
      lyrics: '[Verse] Synthetic content for verification',
      tags: ['test', 'pop', 'original'],
    }) }] } }],
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
