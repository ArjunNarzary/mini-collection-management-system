import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import AppSidebar from "./AppSidebar"

const LayoutComponent = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default LayoutComponent
