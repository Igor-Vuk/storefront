import { NavLink, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { FilterContext } from "../../../context/FilterContext"
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
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
  const { cart, isLoggedIn } = useContext(FilterContext)

  const [userImage, setUserImage] = useState(null)

  const isCartPage = location.pathname === "/kosarica"
  const isAuthPage = location.pathname === "/auth"

  const totalItems = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0,
  )

  // Load user image from sessionStorage if logged in
  useEffect(() => {
    if (isLoggedIn) {
      const savedUserInfo = JSON.parse(sessionStorage.getItem("userInfo"))
      if (savedUserInfo?.image) {
        setUserImage(savedUserInfo.image) // Set user image
      }
    } else {
      setUserImage(null) // Reset to null when logged out
    }
  }, [isLoggedIn])

  return (
    <Menubar className="flex h-auto items-center justify-between rounded-none border-0 border-b border-solid p-0">
      <div className="flex items-center">
        {/* Hide SidebarTrigger */}
        {!(isCartPage || isAuthPage) && <SidebarTrigger />}
      </div>

      <div className="flex items-center space-x-4">
        <MenubarMenu>
          <NavLink to="auth">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <MenubarTrigger className="hover:cursor-pointer">
                    {isLoggedIn && userImage ? (
                      <img
                        src={userImage}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <AvatarIcon className="size-6" />
                    )}
                  </MenubarTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Moj Profil</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </NavLink>
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
