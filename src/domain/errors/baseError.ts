export class BaseError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number, name: string) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }

  toResponse() {
    console.error(this.stack);
		return Response.json({
      error: this.name,
			message: this.message,
			statusCode: this.statusCode
		}, {
			status: this.statusCode
		})
	}
}