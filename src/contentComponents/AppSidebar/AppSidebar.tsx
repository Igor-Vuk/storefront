import React from "react"
import { NavLink } from "react-router-dom"

import CategoryFilter from "../regularComponents/Home/CategoryFilter/CategoryFilter"
import PriceRangeFilter from "../regularComponents/Home/PriceRangeFilter/PriceRangeFilter"
import SortControls from "../regularComponents/Home/SortControls/SortControls"
import OrderControls from "../regularComponents/Home/OrderControls/OrderControls"
import SearchBar from "../regularComponents/Home/SearchBar/SearchBar"

import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

const AppSidebar: React.FC = () => {
  return (
    <Sidebar>
      <SidebarHeader className="text-lg font-bold">
        <span>
          <NavLink to="/">KING ICT</NavLink>
        </span>
      </SidebarHeader>

      <SidebarGroup className="max-h-screen overflow-y-auto">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem className="my-2">
              <SearchBar />
            </SidebarMenuItem>

            <SidebarMenuItem className="my-2">
              <CategoryFilter />
            </SidebarMenuItem>

            <SidebarMenuItem className="my-2">
              <PriceRangeFilter />
            </SidebarMenuItem>

            <SidebarMenuItem className="my-2">
              <SortControls />
            </SidebarMenuItem>

            <SidebarMenuItem className="my-2">
              <OrderControls />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  )
}

export default AppSidebar
