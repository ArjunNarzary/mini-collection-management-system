import express from "express"
import {
  addCustomer,
  deleteCustomer,
  getAllCustomerByAgent,
  getAllCustomerDetails,
  getCustomerDetails,
  updateCustomerDetails,
} from "../controllers"
import { validateData } from "../middlewares"
import { addCustomerSchema } from "../schemas/customerSchema"

const router = express.Router()

router
  .route("/")
  .get(getAllCustomerDetails)
  .post(validateData(addCustomerSchema), addCustomer)
router.route("/agent").get(getAllCustomerByAgent)
router
  .route("/:id")
  .get(getCustomerDetails)
  .put(validateData(addCustomerSchema), updateCustomerDetails)
  .delete(deleteCustomer)

export default router
