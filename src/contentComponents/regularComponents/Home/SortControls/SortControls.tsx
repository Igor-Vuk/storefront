const SortControls = ({
  sortField,
  sortOrder,
  handleSortFieldChange,
  handleSortOrderChange,
}) => {
  return (
    <div>
      <label htmlFor="sortField">Sort By: </label>
      <select id="sortField" value={sortField} onChange={handleSortFieldChange}>
        <option value="title">Name</option>
        <option value="price">Price</option>
      </select>

      <label htmlFor="sortOrder"> Order: </label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  )
}

export default SortControls
