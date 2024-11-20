import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

import { FilterProvider } from "../../context/FilterContext"
import AppSidebar from "../AppSidebar/AppSidebar"
import ModalDial from "../ModalDial/ModalDial"
import MenuBar from "./MenuBar/MenuBar"

const Layout: React.FC = () => {
  const location = useLocation()

  const isCartPage = location.pathname === "/kosarica"
  const isAuthPage = location.pathname === "/auth"

  return (
    <FilterProvider>
      <SidebarProvider>
        {!(isCartPage || isAuthPage) && <AppSidebar />}
        <SidebarInset>
          <MenuBar />
          <main>
            <Outlet />
          </main>
          <ModalDial />
        </SidebarInset>
      </SidebarProvider>
    </FilterProvider>
  )
}

export default Layout
