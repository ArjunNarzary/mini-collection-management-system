import { z } from "zod"

export const loginFormSchema = z.object({
  email: z
    .string({ message: "Please enter you email" })
    .email("Please enter a valid email"),
  password: z
    .string({ message: "Enter password" })
    .min(8, { message: "Invalid password" }),
})
