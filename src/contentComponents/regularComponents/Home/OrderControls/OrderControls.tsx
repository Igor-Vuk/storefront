const OrderControls = ({ sortOrder, handleSortOrderChange }) => {
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
