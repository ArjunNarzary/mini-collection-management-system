import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { findUserById } from "../services"
import CustomError from "../utils/customError"
import { IUser } from "../interfaces"
import asyncHandler from "../utils/asyncHandler"
import { PUBLIC_ROUTES } from "../utils/constants"

export const isAuthenticatedUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //Check if route is public route
    if (PUBLIC_ROUTES.includes(req.path)) {
      next()
      return
    }

    const { token } = req.headers
    if (!token) {
      const err = new CustomError("Please login first", 401)
      next(err)
      return
    }

    const jwtToken = (token as string).split(" ")[1]
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
      const err = new CustomError("Please login first", 401)
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
  }
)
