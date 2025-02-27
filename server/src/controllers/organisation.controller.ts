import { asyncHandler } from "../utils"
import { Request, Response, NextFunction } from "express"

export const addOrganization = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("res", req.body)
  }
)
