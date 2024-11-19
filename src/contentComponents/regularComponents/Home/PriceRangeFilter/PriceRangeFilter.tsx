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
import { PriceRangeOption } from "../../../../context/FilterContext.types"

const priceRanges: PriceRangeOption[] = [
  { label: "All Prices", value: "all" },
  { label: "Up to $10", value: "0-10" },
  { label: "$10 - $50", value: "10-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "Over $100", value: "100+" },
]

const PriceRangeFilter: React.FC = () => {
  const { selectedPriceRange, handlePriceRangeChange } =
    useContext(FilterContext)!

  return (
    <>
      <div className="my-2">
        <Label htmlFor="priceRange">Cijena:</Label>
      </div>
      <Select
        value={selectedPriceRange || "all"}
        onValueChange={(value) => {
          const valueSelected = value === "all" ? "" : value
          handlePriceRangeChange(valueSelected)
        }}
      >
        <SelectTrigger id="priceRange">
          <SelectValue placeholder="Izaberi raspon cijena" />
        </SelectTrigger>
        <SelectContent>
          {priceRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

export default PriceRangeFilter
