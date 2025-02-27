import { NextFunction, Request, Response } from "express"

const asyncHandler = (func: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err: Error) => next(err))
  }
}

export default asyncHandler
