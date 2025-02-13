import { z } from "zod"
import { PAYMENT_STATUS } from "../utils/constants"

export const addCustomerSchema = z.object({
  name: z.string().min(1, "Please provide your name"),
  email: z.string().email("Please provide valid email"),
  address_line_1: z.string().min(1, "Please provide your address"),
  address_line_2: z.string().optional(),
  city: z.string().min(1, "Please provide your city"),
  state: z.string().min(1, "Please provide your state"),
  country: z.string().min(1, "Please provide your country"),
  contact_number: z.string().min(10, "Please provide valid contact number"),
  outstading_payment_amount: z.number().optional(),
  payment_due_date: z.string(),
  payment_status: z.enum(PAYMENT_STATUS).optional(),
})
