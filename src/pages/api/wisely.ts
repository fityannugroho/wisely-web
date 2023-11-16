import type { APIRoute } from 'astro';
import wisely, { type CharSet, type CharSetNames } from 'wisely';

export const prerender = false;

async function fetchBuiltInCharSet(charSet: CharSetNames): Promise<CharSet> {
  const response = await fetch(`https://cdn.jsdelivr.net/npm/wisely@0.2.0/charsets/${charSet}.json`);
  const json = await response.json();
  return json as CharSet;
}

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('q');

  // Load the default charSet
  const charSet = await fetchBuiltInCharSet('latin');

  if (!text) {
    return new Response(JSON.stringify({
      status: 400,
      error: 'Bad Request',
      message: 'No query string provided',
    }), {
      status: 400,
      headers: {'Content-Type': 'application/json; charset=utf-8'},
    });
  }

  return new Response(JSON.stringify({
    status: 200,
    message: 'OK',
    text: wisely({ text, charSets: [charSet] }),
  }), {
    status: 200,
    headers: {'Content-Type': 'application/json; charset=utf-8'},
  });
}
