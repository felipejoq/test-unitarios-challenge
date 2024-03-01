export class CustomError extends Error {

  constructor(
    statusCode,
    message,
  ) {
    super(message);
    this.statusCode = statusCode;
  }

  static notFound(message) {
    return new CustomError(404, message);
  }

  static badRequest(message) {
    return new CustomError(400, message);
  }

  static internalServer(message) {
    return new CustomError(500, message);
  }

}