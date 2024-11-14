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

import { AvatarIcon, RocketIcon } from "@radix-ui/react-icons"

const Layout = () => {
  return (
    <div>
      <Menubar
        className={`h-auto justify-end rounded-none border-0 border-b border-solid p-0`}
      >
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
      </Menubar>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
