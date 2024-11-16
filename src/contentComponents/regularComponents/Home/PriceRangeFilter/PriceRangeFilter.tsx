import { useContext } from "react"
import { FilterContext } from "../../../../context/FilterContext"
const PriceRangeFilter = () => {
  const { selectedPriceRange, handlePriceRangeChange } =
    useContext(FilterContext)

  const priceRanges = [
    { label: "All Prices", value: "" },
    { label: "Up to $10", value: "0-10" },
    { label: "$10 - $50", value: "10-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "Over $100", value: "100+" },
  ]

  return (
    <div>
      <label htmlFor="priceRange">Price Range: </label>
      <select
        id="priceRange"
        value={selectedPriceRange}
        onChange={handlePriceRangeChange}
      >
        {priceRanges.map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PriceRangeFilter
