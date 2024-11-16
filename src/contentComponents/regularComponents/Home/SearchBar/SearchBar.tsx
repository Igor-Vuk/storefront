import { useContext } from "react"
import { FilterContext } from "../../../../context/FilterContext"

const SearchBar = () => {
  const { searchTerm, handleSearchChange } = useContext(FilterContext)
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
