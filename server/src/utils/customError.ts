class CustomError extends Error {
  statusCode: number
  details: { [key: string]: string }[] | undefined
  constructor(
    message: string,
    statusCode: number,
    details?: { [key: string]: string }[] | undefined
  ) {
    super(message)
    this.statusCode = statusCode || 500
    this.details = details

    // Ensure the prototype chain is properly set (fixes issues in TypeScript)
    Object.setPrototypeOf(this, CustomError.prototype)

    // Capture stack trace only if available
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default CustomError
