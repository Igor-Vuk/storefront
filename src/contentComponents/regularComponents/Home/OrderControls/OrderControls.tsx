import React, { useContext } from "react"
import { FilterContext } from "../../../../context/FilterContext"
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { OrderOption } from "../../../../context/FilterContext.types"

const orderOptions: OrderOption[] = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
]

const OrderControls: React.FC = () => {
  const { sortOrder, handleSortOrderChange } = useContext(FilterContext)!

  return (
    <>
      <div className="my-2">
        <Label htmlFor="sortOrder">Poredaj:</Label>
      </div>
      <Select
        value={sortOrder}
        onValueChange={(value) =>
          handleSortOrderChange(value as "asc" | "desc")
        }
      >
        <SelectTrigger id="sortOrder">
          <SelectValue placeholder="Izaberi poredak" />
        </SelectTrigger>
        <SelectContent>
          {orderOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

export default OrderControls
