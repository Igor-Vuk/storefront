import { useContext } from "react"
import { FilterContext } from "../../../../context/FilterContext"

const OrderControls = () => {
  const { sortOrder, handleSortOrderChange } = useContext(FilterContext)
  return (
    <div>
      <label htmlFor="sortOrder"> Order: </label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  )
}

export default OrderControls
