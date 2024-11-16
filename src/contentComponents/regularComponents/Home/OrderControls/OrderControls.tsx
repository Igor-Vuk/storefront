import { useContext } from "react"
import { FilterContext } from "../../../../context/FilterContext"
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const orderOptions = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
]

const OrderControls = () => {
  const { sortOrder, handleSortOrderChange } = useContext(FilterContext)

  return (
    <>
      <div className="my-2">
        <Label htmlFor="sortOrder">Poredaj:</Label>
      </div>
      <Select
        value={sortOrder}
        onValueChange={(value) => handleSortOrderChange({ target: { value } })}
      >
        <SelectTrigger id="sortOrder">
          <SelectValue />
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
