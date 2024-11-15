import { NavLink, Outlet } from "react-router-dom"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { AppSidebar } from "../AppSidebar/AppSidebar"

import { AvatarIcon, RocketIcon } from "@radix-ui/react-icons"

const Layout = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Menubar className="flex h-auto items-center justify-between rounded-none border-0 border-b border-solid p-0">
            <div className="flex items-center">
              <SidebarTrigger />
            </div>

            <div className="flex items-center space-x-4">
              <MenubarMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <MenubarTrigger>
                        <AvatarIcon className="size-6" />
                      </MenubarTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Moj Profil</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <MenubarContent>
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <NavLink to="košarica">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <MenubarTrigger className="rounded-none bg-green-500 hover:bg-green-600">
                          <RocketIcon className="size-6" />
                        </MenubarTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Idi u košaricu</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </NavLink>
              </MenubarMenu>
            </div>
          </Menubar>

          <main>
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default Layout
