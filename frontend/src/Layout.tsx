import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Navbar from "./components/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <main className="min-h-full max-w-[1280px] m-0 p-[2rem]"> */}
      <div className="w-full">
        <main className="min-h-full p-4">
          <Navbar />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
