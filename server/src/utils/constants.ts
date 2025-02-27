export const ROLES = ["ADMIN", "AGENT"] as const
export const PAYMENT_STATUS = ["COMPLETED", "PENDING"] as const

export const PUBLIC_ROUTES: string[] = [
  "/api/v1/user/refresh-token",
  "/api/v1/user/login",
  "/api/v1/user/logout",
  "/api/v1/user/register",
] as const
