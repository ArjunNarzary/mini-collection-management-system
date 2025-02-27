import express from "express"
import { addOrganization } from "../controllers"
import { validateData } from "../middlewares"
import { organizationSchema } from "../schemas"
const router = express.Router()

router.route("/").post(validateData(organizationSchema), addOrganization)

export default router
