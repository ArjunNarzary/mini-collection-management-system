import { z } from "zod"

export const userRegistrationSchema = z.object({
  name: z.string().min(1, "Please provide your name"),
  email: z.string().email("Please provide valid email"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
})

export const userLoginSchema = z.object({
  email: z.string().email("Please provide valid email"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
})
