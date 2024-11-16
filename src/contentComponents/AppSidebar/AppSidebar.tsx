import CategoryFilter from "../regularComponents/Home/CategoryFilter/CategoryFilter"
import PriceRangeFilter from "../regularComponents/Home/PriceRangeFilter/PriceRangeFilter"
import SortControls from "../regularComponents/Home/SortControls/SortControls"
import OrderControls from "../regularComponents/Home/OrderControls/OrderControls"
import SearchBar from "../regularComponents/Home/SearchBar/SearchBar"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>KING ICT</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <CategoryFilter />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <PriceRangeFilter />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SortControls />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <OrderControls />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SearchBar />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
