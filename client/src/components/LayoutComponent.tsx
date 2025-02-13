import { ReactNode } from "react"

const LayoutComponent = ({ children }: { children: ReactNode }) => {
  return <main>{children}</main>
}

export default LayoutComponent
