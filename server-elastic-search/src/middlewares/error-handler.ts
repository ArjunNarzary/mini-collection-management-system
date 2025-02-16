import { Request, Response, NextFunction } from "express"

// function hasStatusCodeSetter(error: any) {
//   const descriptor = Object.getOwnPropertyDescriptor(error, "statusCode")
//   return !!(descriptor && descriptor.set)
// }

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error", error)
  // const isNotElasticError = hasStatusCodeSetter(error)
  // if (isNotElasticError) {
  error.statusCode =
    error?.statusCode || (error.message === "jwt expired" ? 401 : 500)
  error.details = error?.details ?? undefined

  res.status(error.statusCode).json({
    success: false,
    message: error.message || "Something went wrong",
    // message:
    //   isNotElasticError && error.message
    //     ? error.message
    //     : "Something went wrong",
    details: error.details,
  })
}
