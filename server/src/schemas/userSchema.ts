import { z } from "zod"
import { ROLES } from "../utils/constants"

export const userRegistrationSchema = z.object({
  name: z.string().min(1, "Please provide your name"),
  email: z.string().email("Please provide valid email"),
  role: z.enum(ROLES, {
    required_error: "Role is required",
    invalid_type_error: "Role must be either ADMIN or AGENT",
  }),
  password: z.string().min(8, "Password must be atleast 8 characters"),
})

export const userLoginSchema = z.object({
  email: z.string().email("Please provide valid email"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
})
