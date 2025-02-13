import { LayoutComponent } from "@/components"
import { Navigate, Outlet } from "react-router"

interface IProtectedRoutesProps {
  isAuthenticated: boolean
  redirectTo: string
}

const ProtectedRoutes = ({
  isAuthenticated,
  redirectTo,
}: IProtectedRoutesProps) => {
  if (isAuthenticated) {
    return (
      <LayoutComponent>
        <Outlet />
      </LayoutComponent>
    )
  }

  return <Navigate to={redirectTo} replace />
}

export default ProtectedRoutes
