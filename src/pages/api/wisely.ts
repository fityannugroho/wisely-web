import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import wisely, { CharSets, isCharSetValid, isPhraseValid, type CharSet } from 'wisely/core';

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

class BadRequestResponse extends Response {
  constructor(message: string | object, headers?: HeadersInit) {
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

class InternalServerErrorResponse extends Response {
  constructor(message: string | object, headers?: HeadersInit) {
    super(JSON.stringify({
      status: 500,
      error: 'Internal Server Error',
      message,
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
      },
    });
  }
}

function isValidJSON(val: string) {
  try {
    JSON.parse(val);
    return true;
  } catch (error) {
    return false;
  }
}

const payloadSchema = z.object({
  text: z.string().trim().min(1),
  caseSensitive: z.boolean().optional(),
  charSets: z.array(z.nativeEnum(CharSets)).optional(),
  customCharSet: z.string().trim()
    .refine(isValidJSON, 'Invalid JSON format')
    .transform((val) => JSON.parse(val) as CharSet)
    .refine(isCharSetValid, 'Invalid charset provided')
    .optional(),
  phrases: z.array(z.string().trim()
    .refine(isPhraseValid, 'Invalid phrase provided'))
    .optional(),
});

type Payload = z.infer<typeof payloadSchema>;

export const POST: APIRoute = async ({ request }) => {
  // Get the payload
  const payload = await request.json();

  // Validate the payload
  let validated: Payload;
  try {
    validated = await payloadSchema.parseAsync(payload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new BadRequestResponse(error.flatten().fieldErrors);
    }
    return new InternalServerErrorResponse(
      error instanceof Error ? error.message : 'Error validating payload',
    );
  }

  const { text, phrases, charSets: charSetNames = [], caseSensitive} = validated;

  const charSets = await Promise.all(
    charSetNames.map((name) => {
      const cached = charSetCache.get(name);
      const maxAge = import.meta.env.WISELY_CACHE_MAX_AGE || 60 * 60 * 24;

      if (cached && Date.now() - cached.lastFetch < maxAge * 1000) {
        return cached.charSet;
      }

      return fetchBuiltInCharSet(name).then((charSet) => {
        charSetCache.set(name, { charSet, lastFetch: Date.now() });
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
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
