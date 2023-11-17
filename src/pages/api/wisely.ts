import type { APIRoute } from 'astro';
import wisely, { CharSets, type CharSet, type CharSetNames } from 'wisely';

export const prerender = false;

async function fetchBuiltInCharSet(charSet: CharSetNames): Promise<CharSet> {
  const response = await fetch(`https://cdn.jsdelivr.net/npm/wisely@0.2.0/charsets/${charSet}.json`);
  const json = await response.json();
  return json as CharSet;
}

function isValidCharSetName(name: string): name is CharSetNames {
  return Object.values(CharSets).includes(name as CharSetNames);
}

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('q');
  const charSetNames = searchParams.getAll('charSet');
  const caseSensitive = searchParams.has('caseSensitive');

  if (!text?.length) {
    return new Response(JSON.stringify({
      status: 400,
      error: 'Bad Request',
      message: 'No text provided',
    }), {
      status: 400,
      headers: {'Content-Type': 'application/json; charset=utf-8'},
    });
  }

  // Validate the charSetNames
  if (charSetNames.some((name) => !isValidCharSetName(name))) {
    return new Response(JSON.stringify({
      status: 400,
      error: 'Bad Request',
      message: 'Invalid charSet name provided',
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  if (!charSetNames.length) {
    charSetNames.push('latin');
  }

  const charSets = await Promise.all(
    charSetNames.map((name) => fetchBuiltInCharSet(name as CharSetNames)),
  );

  return new Response(JSON.stringify({
    status: 200,
    message: 'OK',
    text: wisely({ text, charSets, caseSensitive }),
  }), {
    status: 200,
    headers: {'Content-Type': 'application/json; charset=utf-8'},
  });
}
