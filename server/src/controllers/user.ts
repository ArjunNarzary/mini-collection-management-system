import { CookieOptions, NextFunction, Request, Response } from "express"
import asyncHandler from "../utils/asyncHandler"
import {
  checkIfUserExist,
  createUser,
  deleteUserById,
  findUserByEmail,
  findUserById,
} from "../services"
import CustomError from "../utils/customError"
import * as argon2 from "argon2"
import jwt from "jsonwebtoken"
import { IUser } from "../interfaces"

const getCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: true,
  sameSite: "none",
}

const generateToken = (
  data: { [key: string]: string },
  screte: string,
  expires: string = "15d"
) => {
  const expiresIn = expires.includes("d")
    ? parseInt(expires) * 24 * 60 * 60
    : parseInt(expires) * 60
  return jwt.sign({ ...data }, screte, {
    expiresIn,
  })
}

//Match Password
const matchPassword = async function (
  currentPassword: string,
  modelPassword: string
) {
  return await argon2.verify(currentPassword, modelPassword)
}

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body

    const { count } = await checkIfUserExist(email)

    if (count > 0) {
      const err = new CustomError("Email is already registered", 400)
      next(err)
      return
    }

    const hashPassword = await argon2.hash(password)
    const user = {
      name,
      email,
      password: hashPassword,
      role,
      createAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await createUser(user)

    res.status(200).json({
      success: true,
      message: "User created successful",
    })
    return
  }
)

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    const result = await findUserByEmail(email)

    if (result.hits.hits.length === 0) {
      const err = new CustomError("Email is not register with us", 404)
      next(err)
      return
    }

    const { _id, _source } = result.hits.hits[0]

    if (!matchPassword((_source as IUser).password, password)) {
      const err = new CustomError("Password didn't match", 400)
      next(err)
      return
    }

    const generateRefreshToken = generateToken(
      { _id: _id as string, email: (_source as IUser).email },
      process.env.REFRESH_TOKEN_SECRET as string
    )

    const generateAccessToken = generateToken(
      { _id: _id as string, email: (_source as IUser).email },
      process.env.ACCESS_TOKEN_SECRET as string,
      "15m"
    )

    const user = { ...(_source as IUser), _id: _id, password: "" }
    res
      .status(200)
      .cookie("token", generateRefreshToken, getCookieOptions)
      .json({
        success: true,
        message: "Login successful",
        user: user,
        token: generateAccessToken,
      })
  }
)

export const logoutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).clearCookie("token").json({
      success: true,
      message: "Logout successful",
    })
  }
)

export const handleRefreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies

    if (!token) {
      const err = new CustomError("Please login first", 401)
      next(err)
      return
    }

    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    )

    if (!decoded) {
      const err = new CustomError("Token Expired", 401)
      next(err)
      return
    }

    const result = await findUserById((<any>decoded)._id)

    if (result.hits.hits.length === 0) {
      const err = new CustomError("Unauthorized user", 401)
      next(err)
      return
    }

    const generateAccessToken = generateToken(
      { _id: (<any>decoded)._id, email: (<any>decoded).email },
      process.env.ACCESS_TOKEN_SECRET as string,
      "15m"
    )

    const user = {
      ...(result.hits.hits[0]._source as IUser),
      _id: result.hits.hits[0]._id,
      password: "",
    }

    res.status(200).json({
      success: true,
      message: "Token refreshed",
      user: user,
      token: generateAccessToken,
    })
  }
)
