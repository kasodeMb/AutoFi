/* eslint-disable max-classes-per-file */

/**
 * Class representing a bad request error.
 * @extends Error
 * @exports
 */
export class BadRequestError extends Error {
  /**
   * Create a bad request error.
   * @param {object} error - Error containing the error message
   */
  constructor(error) {
    super(error.message)
    Error.captureStackTrace(this, BadRequestError)
    this.statusCode = 400
  }
}

/**
 * Class representing a server error.
 * @extends Error
 * @exports
 */
export class ServerError extends Error {
  /**
   * Create a bad request error.
   * @param {string} message -Error message
   */
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, ServerError)
    this.statusCode = 500
  }
}
