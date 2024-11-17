import { NavLink, Outlet, useLocation } from "react-router-dom"
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

import { AvatarIcon, RocketIcon } from "@radix-ui/react-icons"

import { FilterProvider } from "../../context/FilterContext"
import { AppSidebar } from "../AppSidebar/AppSidebar"

const Layout = () => {
  const location = useLocation()

  const isCartPage = location.pathname === "/kosarica"

  return (
    <FilterProvider>
      <SidebarProvider>
        {!isCartPage && <AppSidebar />}
        <SidebarInset>
          <Menubar className="flex h-auto items-center justify-between rounded-none border-0 border-b border-solid p-0">
            <div className="flex items-center">
              {!isCartPage && <SidebarTrigger />} {/* Hide SidebarTrigger */}
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
                <NavLink to="kosarica">
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
    </FilterProvider>
  )
}

export default Layout
