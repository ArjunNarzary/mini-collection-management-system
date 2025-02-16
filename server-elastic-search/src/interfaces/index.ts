import { z } from "zod"
import { addCustomerSchema } from "../schemas/customerSchema"

export interface IUser {
  name: string
  email: string
  password: string
  role: string
  createAt: string
  updatedAt: string
}

export interface ICustomer extends z.infer<typeof addCustomerSchema> {
  createAt: string
  updatedAt: string
  agent: {
    _id: string
    name: string
  }
}
