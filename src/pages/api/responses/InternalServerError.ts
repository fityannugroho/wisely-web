export default class InternalServerErrorResponse extends Response {
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
