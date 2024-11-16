import { useContext } from "react"
import { FilterContext } from "../../../../context/FilterContext"

const SortControls = () => {
  const { sortField, handleSortFieldChange } = useContext(FilterContext)

  return (
    <div>
      <label htmlFor="sortField">Sort By: </label>
      <select id="sortField" value={sortField} onChange={handleSortFieldChange}>
        <option value="title">Name</option>
        <option value="price">Price</option>
      </select>
    </div>
  )
}

export default SortControls
