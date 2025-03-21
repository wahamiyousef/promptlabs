import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Navbar from "./components/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <main className="min-h-full max-w-[1280px] m-0 p-[2rem]"> */}
      <div className="flex flex-col w-full min-h-screen">
        {/* Sticky Navbar at the top */}
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        {/* Content below Navbar with padding to avoid overlap */}
        <main className="flex-grow p-4 pt-18">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
