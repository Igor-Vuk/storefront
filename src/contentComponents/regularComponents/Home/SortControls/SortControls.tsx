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
import { SortOption } from "../../../../context/FilterContext.types.ts"

const sortOptions: SortOption[] = [
  { label: "Name", value: "title" },
  { label: "Price", value: "price" },
]

const SortControls: React.FC = () => {
  const { sortField, handleSortFieldChange } = useContext(FilterContext)!

  return (
    <>
      <div className="my-2">
        <Label htmlFor="sortField">Sortiraj:</Label>
      </div>
      <Select
        value={sortField}
        onValueChange={(value) =>
          handleSortFieldChange(value as "title" | "price")
        }
      >
        <SelectTrigger id="sortField">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

export default SortControls
