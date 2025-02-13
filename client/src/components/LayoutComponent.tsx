import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import AppSidebar from "./AppSidebar"
import { ChevronRight } from "lucide-react"

const LayoutComponent = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="pt-2 w-full">
        <div className="flex items-center justify-start">
          <SidebarTrigger />
          <ChevronRight size={16} />
          <h5>Home</h5>
        </div>
        <section className="p-2">{children}</section>
      </main>
    </SidebarProvider>
  )
}

export default LayoutComponent
