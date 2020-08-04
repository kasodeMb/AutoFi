/* eslint-disable max-classes-per-file */
export class BadRequestError extends Error {
  constructor(error) {
    super(error.message)
    Error.captureStackTrace(this, BadRequestError)
    this.statusCode = 400
  }
}

export class ServerError extends Error {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, ServerError)
    this.statusCode = 500
  }
}
