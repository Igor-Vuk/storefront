import React, { useContext } from "react"
import { FilterContext } from "../../../../context/FilterContext"
import { Input } from "@/components/ui/input"

const SearchBar: React.FC = () => {
  const { searchTerm, handleSearchChange } = useContext(FilterContext) || {}

  return (
    <Input
      type="text"
      id="search"
      placeholder="Pretraži artikle"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  )
}

export default SearchBar
