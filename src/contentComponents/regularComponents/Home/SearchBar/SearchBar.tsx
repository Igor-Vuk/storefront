const SearchBar = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  )
}

export default SearchBar
