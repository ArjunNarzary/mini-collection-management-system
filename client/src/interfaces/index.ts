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

export type IPAYMENTSTATUS = "COMPLETED" | "PENDING"
