const PriceRangeFilter = ({
  priceRanges,
  selectedPriceRange,
  handlePriceRangeChange,
}) => {
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
