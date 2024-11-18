import { NavLink, useLocation } from "react-router-dom"
import { useContext } from "react"
import { FilterContext } from "../../../context/FilterContext"
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
import { SidebarTrigger } from "@/components/ui/sidebar"

import { AvatarIcon, RocketIcon } from "@radix-ui/react-icons"

const Layout = () => {
  const location = useLocation()
  const { cart } = useContext(FilterContext)

  const isCartPage = location.pathname === "/kosarica"

  const totalItems = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0,
  )

  return (
    <Menubar className="flex h-auto items-center justify-between rounded-none border-0 border-b border-solid p-0">
      <div className="flex items-center">
        {!isCartPage && <SidebarTrigger />} {/* Hide SidebarTrigger */}
      </div>

      <div className="flex items-center space-x-4">
        <MenubarMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MenubarTrigger className="hover:cursor-pointer">
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
                  <MenubarTrigger className="rounded-none bg-green-500 hover:bg-green-600 hover:cursor-pointer flex items-center">
                    <RocketIcon className="size-6" />
                    {totalItems > 0 && (
                      <span className="ml-2 rounded-full bg-red-500 text-white text-xs px-2 py-1">
                        {totalItems}
                      </span>
                    )}
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
  )
}

export default Layout
