import { z } from "zod"

export const organizationSchema = z.object({
  name: z.string().min(1, "Please provide organization name"),
})

export * from "./userSchema"
