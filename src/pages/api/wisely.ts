import type { APIRoute } from 'astro';
import wisely, { CharSets, isPhraseValid, type CharSet } from 'wisely/core';

export const prerender = false;

type CharSetNames = typeof CharSets[keyof typeof CharSets];

async function fetchBuiltInCharSet(charSet: CharSetNames): Promise<CharSet> {
  const response = await fetch(
    `https://cdn.jsdelivr.net/npm/wisely/charsets/${charSet}.json`
  );
  return await response.json() as CharSet;
}

/**
 * A cache of built-in charsets.
 */
const charSetCache = new Map<CharSetNames, {
  charSet: CharSet,
  lastFetch: number,
}>();

function isValidCharSetName(name: string): name is CharSetNames {
  return typeof name === 'string'
    && Object.values(CharSets).includes(name as CharSetNames);
}

class BadRequestResponse extends Response {
  constructor(message: string, headers?: HeadersInit) {
    super(JSON.stringify({
      status: 400,
      error: 'Bad Request',
      message,
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
      },
    });
  }
}

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('t');
  const charSetNames = searchParams.getAll('charset') as CharSetNames[];
  const caseSensitive = searchParams.has('sensitive');
  const phrases = Array.from(new Set(
    searchParams.get('p')?.split(',')
      .filter(isPhraseValid).map((phrase) => phrase.trim())
  ));

  if (!text?.length) {
    return new BadRequestResponse('No text provided');
  }

  // Validate the charSetNames
  if (charSetNames.some((name) => !isValidCharSetName(name))) {
    return new BadRequestResponse('Invalid charset');
  }

  if (!charSetNames.length) {
    charSetNames.push('latin');
  }

  const charSets = await Promise.all(
    charSetNames.map((name) => {
      const cached = charSetCache.get(name);
      const maxAge = import.meta.env.WISELY_CACHE_MAX_AGE || 60 * 60 * 24;

      if (cached && Date.now() - cached.lastFetch < maxAge * 1000) {
        return cached.charSet;
      }

      return fetchBuiltInCharSet(name).then((charSet) => {
        charSetCache.set(name, { charSet, lastFetch: Date.now()});
        return charSet;
      });
    }),
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
