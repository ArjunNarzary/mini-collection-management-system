import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { findUserById } from "../services"
import CustomError from "../utils/customError"
import { IUser } from "../interfaces"
import { PUBLIC_ROUTES } from "../utils/constants"

export const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Check if route is public route
    if (PUBLIC_ROUTES.includes(req.path)) {
      next()
      return
    }

    const { authorization } = req.headers
    if (!authorization) {
      const err = new CustomError("Please login first", 401)
      next(err)
      return
    }

    const jwtToken = (authorization as string).split(" ")[1]
    if (!jwtToken) {
      const err = new CustomError("Please login first", 401)
      next(err)
      return
    }
    const decoded = jwt.verify(
      jwtToken,
      process.env.ACCESS_TOKEN_SECRET as string
    )
    //Check if token expired
    if (!decoded) {
      const err = new CustomError("Token expired", 401)
      next(err)
      return
    }

    const result = await findUserById((<any>decoded)._id)
    if (result.hits.hits.length === 0) {
      const err = new CustomError("Unauthorized user", 401)
      next(err)
      return
    }
    const user = {
      ...(result.hits.hits[0]._source as IUser),
      _id: result.hits.hits[0]._id,
    }

    req.body.authUser = user
    next()
  } catch {
    const err = new CustomError("Invalid Jwt", 401)
    next(err)
    return
  }
}
