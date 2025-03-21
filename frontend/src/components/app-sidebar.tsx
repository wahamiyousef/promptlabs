import { Home, Inbox, Search, Brain, Settings, LibraryBig, FilePlus, EllipsisVertical, Trash2, MapPlus, ListFilterPlus, Bot } from "lucide-react"
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
  /*
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  */
  {
    title: "Generate MVP",
    url: "/generate/mvps",
    icon: MapPlus,
    icon2: MapPlus,
    icon3: ListFilterPlus
  },
  {
    title: "Generate Ideas",
    url: "/generate/ideas",
    icon: Brain,
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
  },
  {
    title: "SaaS App idea #2",
    url: "/",
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="flex justify-center gap-2 text-xl pt-4 select-none">
        <Bot />
        <h1>PromptLabs</h1>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
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
                        <DropdownMenuItem variant="destructive" onClick={() => console.log(`Deleting ${item.title}`)}>
                          <Trash2 />
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
