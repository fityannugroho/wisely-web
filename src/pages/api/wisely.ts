import type { APIRoute } from 'astro';
import wisely from 'wisely';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('q');

  if (!text) {
    return new Response(JSON.stringify({
      status: 400,
      error: 'Bad Request',
      message: 'No query string provided'
    }), {
      status: 400,
      headers: {'Content-Type': 'application/json'},
    });
  }

  const res = wisely({ text });
  console.log(text, res);

  return new Response(JSON.stringify({
    status: 200,
    message: 'OK',
    text: res
  }), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  });
}
