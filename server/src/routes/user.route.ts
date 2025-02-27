import express from "express"
import {
  handleRefreshToken,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers"
import { validateData } from "../middlewares"
import { userLoginSchema, userRegistrationSchema } from "../schemas"

const router = express.Router()

router
  .route("/register")
  .post(validateData(userRegistrationSchema), registerUser)

router.route("/login").post(validateData(userLoginSchema), loginUser)

router.route("/refresh-token").get(handleRefreshToken)

router.route("/logout").put(logoutUser)
export default router
