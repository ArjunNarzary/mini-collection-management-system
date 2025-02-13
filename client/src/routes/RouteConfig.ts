import { DashboardContainer, LoginContainer } from "@/containers"
import { AppPath } from "./RouteName"
import { JSX } from "react"

export interface IRouteConfig {
  path: string
  component: () => JSX.Element
}
export const PrivateRoutes: IRouteConfig[] = [
  {
    path: AppPath.dashboard,
    component: DashboardContainer,
  },
  {
    path: AppPath.base,
    component: DashboardContainer,
  },
]

export const PublicRoutes: IRouteConfig[] = [
  {
    path: AppPath.login,
    component: LoginContainer,
  },
]
