import React, { useContext, useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
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
import { CartItem, UserInfo } from "../../../context/FilterContext.types"

const MenuBar: React.FC = () => {
  const location = useLocation()
  const { cart, isLoggedIn } = useContext(FilterContext)!

  const [userInfo, setUserInfo] = useState<Omit<
    UserInfo,
    "accessToken" | "refreshToken"
  > | null>(null)

  const isCartPage = location.pathname === "/kosarica"
  const isAuthPage = location.pathname === "/auth"

  // Calculate total items in the cart
  const totalItems = Object.values(cart).reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0,
  )

  // Load user information from sessionStorage if logged in
  useEffect(() => {
    if (isLoggedIn) {
      const savedUserInfo: UserInfo | null = JSON.parse(
        sessionStorage.getItem("userInfo") || "null",
      )

      if (savedUserInfo) {
        /* Don't save accessToken and refresh token to state */
        const { accessToken, refreshToken, ...filteredUserInfo } = savedUserInfo
        setUserInfo(filteredUserInfo)
      }
    } else {
      setUserInfo(null) // Reset to null when logged out
    }
  }, [isLoggedIn])

  return (
    <Menubar className="flex h-auto items-center justify-between rounded-none border-0 border-b border-solid p-0">
      <div className="flex items-center">
        {/* Hide SidebarTrigger if on cart or auth page */}
        {!(isCartPage || isAuthPage) && <SidebarTrigger />}
      </div>

      <div className="flex items-center space-x-4">
        <MenubarMenu>
          <NavLink to="auth">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <MenubarTrigger className="hover:cursor-pointer">
                    {isLoggedIn && userInfo?.image ? (
                      <img
                        src={userInfo.image}
                        alt={`${userInfo.firstName} ${userInfo.lastName}`}
                        className="size-8 rounded-full object-cover"
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
                  <MenubarTrigger className="flex items-center rounded-none bg-green-500 hover:cursor-pointer hover:bg-green-600">
                    <RocketIcon className="size-6" />
                    {totalItems > 0 && (
                      <span className="ml-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
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

export default MenuBar
