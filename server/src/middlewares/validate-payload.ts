import { Request, Response, NextFunction } from "express"
import { z, ZodError } from "zod"
import CustomError from "../utils/customError"

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          [issue.path.join(".")]: issue.message,
        }))

        const err = new CustomError("Invalid payload", 400, errorMessages)
        next(err)
      } else {
        next(error)
      }
    }
  }
}
