import { Calendar, Home, Inbox, Search, Settings, LibraryBig, FilePlus, EllipsisVertical } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Create Exam",
    url: "/generate",
    icon: FilePlus,
  },
  {
    title: "My Exams",
    url: "/exams",
    icon: LibraryBig,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Account",
    url: "/account",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

const userChats = [
  {
    title: "SaaS idea 1",
    url: "/",
    icon: Home,
  },
  {
    title: "SaaS App idea #2",
    url: "/",
    icon: Home,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>PromptLabs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>MVPs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {userChats.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <div className="flex items-center justify-between w-full hover:bg-accent rounded-md group">
                    {/* Link */}
                    <a href={item.url} className="flex-1 truncate px-2">
                      {item.title}
                    </a>

                    {/* Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          // className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()} // Prevent link click
                        >
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => console.log(`Deleting ${item.title}`)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
