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

const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Up to $10", value: "0-10" },
  { label: "$10 - $50", value: "10-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "Over $100", value: "100+" },
]

const PriceRangeFilter = () => {
  const { selectedPriceRange, handlePriceRangeChange } =
    useContext(FilterContext)

  return (
    <>
      <div className="my-2">
        <Label htmlFor="priceRange">Cijena:</Label>
      </div>
      <Select
        value={selectedPriceRange || "all"}
        onValueChange={(value) =>
          handlePriceRangeChange({
            target: { value: value === "all" ? "" : value },
          })
        }
      >
        <SelectTrigger id="priceRange">
          <SelectValue />
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
