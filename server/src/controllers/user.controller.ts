import { Request, Response, NextFunction } from "express"
import { asyncHandler } from "../utils"

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("OK")
    res.send("ok")
  }
)
