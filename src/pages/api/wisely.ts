import type { APIRoute } from 'astro';
import wisely, { CharSets, isPhraseValid, type CharSet } from 'wisely/core';

export const prerender = false;

type CharSetNames = typeof CharSets[keyof typeof CharSets];

async function fetchBuiltInCharSet(charSet: CharSetNames): Promise<CharSet> {
  const response = await fetch(`https://cdn.jsdelivr.net/npm/wisely/charsets/${charSet}.json`);
  const json = await response.json();
  return json as CharSet;
}

function isValidCharSetName(name: string): name is CharSetNames {
  return typeof name === 'string'
    && Object.values(CharSets).includes(name as CharSetNames);
}

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('t');
  const charSetNames = searchParams.getAll('charset');
  const caseSensitive = searchParams.has('sensitive');
  const phrases = Array.from(new Set(
    searchParams.get('p')?.split(',')
      .filter(isPhraseValid).map((phrase) => phrase.trim())
  ));

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
      message: 'Invalid charset name provided',
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
    text: wisely({ text, phrases, charSets, caseSensitive }),
  }), {
    status: 200,
    headers: {'Content-Type': 'application/json; charset=utf-8'},
  });
}
