import { Request, Response, NextFunction, CookieOptions } from "express"
import jwt from "jsonwebtoken"
import argon2 from "argon2"
import { asyncHandler, CustomError } from "../utils"
import { findUserByEmail, findUserById, insertUserData } from "../services"

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
  password: string
) {
  return await argon2.verify(password, currentPassword)
}

const generateTokensAndSendResponse = async (
  user: any,
  res: Response,
  next: NextFunction
) => {
  const generateRefreshToken = generateToken(
    { id: user.id as string, email: user.email },
    process.env.REFRESH_TOKEN_SECRET as string
  )

  const generateAccessToken = generateToken(
    { id: user.id as string, email: user.email },
    process.env.ACCESS_TOKEN_SECRET as string,
    "15m"
  )

  res
    .status(200)
    .cookie("token", generateRefreshToken, getCookieOptions)
    .json({
      success: true,
      message: "Login successful",
      user: { ...user, password: undefined },
      token: generateAccessToken,
    })
}

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body

    //Check if user already exist
    const user = await findUserByEmail(email)

    if (user) {
      const err = new CustomError("Email is already registered", 400)
      next(err)
      return
    }

    const hashPassword = await argon2.hash(password)
    const newUser = {
      name,
      email,
      password: hashPassword,
      role,
    }

    const userRes = await insertUserData(newUser)

    await generateTokensAndSendResponse(userRes, res, next)
    return
  }
)

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const user = await findUserByEmail(email)
    if (!user) {
      const err = new CustomError("Email is not registered", 400)
      next(err)
      return
    }
    const isMatch = await matchPassword(password, user.password)
    if (!isMatch) {
      const err = new CustomError("Password is incorrect", 400)
      next(err)
      return
    }

    await generateTokensAndSendResponse(user, res, next)
    return
  }
)

export const handleRefreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token
    if (!token) {
      const err = new CustomError("Please login first", 400)
      next(err)
      return
    }

    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    )

    if (!decoded) {
      const err = new CustomError("Token Expired", 400)
      next(err)
      return
    }

    const user = await findUserById((<any>decoded).id)

    if (!user) {
      const err = new CustomError("Unauthorized user", 400)
      next(err)
      return
    }

    await generateTokensAndSendResponse(user, res, next)
    return
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
