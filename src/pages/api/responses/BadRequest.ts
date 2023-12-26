export default class BadRequestResponse extends Response {
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
