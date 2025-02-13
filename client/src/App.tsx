import { Navigate, Route, Routes, useLocation } from "react-router"
import "./App.css"
import {
  AppPath,
  IRouteConfig,
  PrivateRoutes,
  ProtectedRoutes,
  PublicRoutes,
} from "./routes"
import { useSelector } from "react-redux"
import { selectUser } from "./services/auth/authSlice"

function App() {
  const location = useLocation()
  const isAuthenticated = useSelector(selectUser) !== null

  const isPublicRoute = (pathname: string) => {
    return PublicRoutes.some((route) => pathname.startsWith(route.path))
  }

  const renderRoutes = (routes: IRouteConfig[]) => {
    return routes.map((route: IRouteConfig) => {
      const { path, component: Component } = route
      return <Route key={path} path={path} element={<Component />} />
    })
  }
  return (
    <>
      <Routes>
        {isAuthenticated && isPublicRoute(location.pathname) ? (
          <Route path="*" element={<Navigate to={AppPath.base} replace />} />
        ) : (
          <>
            <Route
              element={
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  redirectTo={AppPath.login}
                />
              }
            >
              {renderRoutes(PrivateRoutes)}
            </Route>
            {renderRoutes(PublicRoutes)}
          </>
        )}
      </Routes>
    </>
  )
}

export default App
