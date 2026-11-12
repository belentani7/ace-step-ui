// A provider key must never be injected into the browser bundle.
// Song text is generated through the local server, which owns its credential.
export interface SongData {
  title: string;
  lyrics: string;
  tags: string[];
}

export async function generateSongData(topic: string, style: string): Promise<SongData> {
  const response = await fetch('/api/lyrics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic, style }),
  });

  if (!response.ok) {
    throw new Error(response.status === 503
      ? 'Lyrics generation is not configured on the local server.'
      : 'Lyrics could not be generated. Please try again.');
  }

  const data: unknown = await response.json();
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid lyrics response.');
  }
  const song = data as Partial<SongData>;
  if (
    typeof song.title !== 'string' ||
    typeof song.lyrics !== 'string' ||
    !Array.isArray(song.tags) ||
    !song.tags.every((tag) => typeof tag === 'string')
  ) {
    throw new Error('Invalid lyrics response.');
  }
  return { title: song.title, lyrics: song.lyrics, tags: song.tags };
}
