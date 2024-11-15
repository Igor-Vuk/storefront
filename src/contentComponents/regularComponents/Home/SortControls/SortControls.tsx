const SortControls = ({ sortField, handleSortFieldChange }) => {
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
