import express from "express"
import { registerUser } from "../controllers"
import { validateData } from "../middlewares"
import { userRegistrationSchema } from "../schemas"

const router = express.Router()

router
  .route("/register")
  .post(validateData(userRegistrationSchema), registerUser)

export default router
