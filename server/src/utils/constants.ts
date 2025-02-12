export const ROLES = ["ADMIN", "BROKER"] as const

export const PUBLIC_ROUTES: string[] = [
  "/api/v1/user/refresh-token",
  "/api/v1/user/login",
  "/api/v1/user/logout",
] as const
