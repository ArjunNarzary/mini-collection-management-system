// Users
export interface IUserData {
  name: string
  email: string
  createAt: string
  updatedAt: string
  _id: string
}

export interface ILoginPayload {
  email: string
  password: string
}

export interface IDefaultResponse {
  success: string
  message: string
}

export interface ILoginResponse extends IDefaultResponse {
  user: IUserData
  token: string
}

export interface IAuthInitailState {
  token: string | null
  user: IUserData | null
}

export interface APIError {
  data: {
    message: string
    success: boolean
  }
}

//Customer

export type IPAYMENTSTATUS = "COMPLETED" | "PENDING"

export interface ICustomerPayload {
  name: string
  email: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  country: string
  contact_number: string
  payment_due_date: string
  payment_status?: IPAYMENTSTATUS
}

export interface ICustomer extends ICustomerPayload {
  agent: {
    _id: string
    name: string
  }
  createAt: string
  updatedAt: string
  _id: string
}

export interface ICustomerResponse extends IDefaultResponse {
  customers: ICustomer[]
}
