import { createContext, useState, useEffect } from "react"
import { fetchCategories, fetchProducts } from "../api/api"

export const FilterContext = createContext(undefined)

// Create the provider component
export const FilterProvider = ({ children }) => {
  // State variables
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [sortField, setSortField] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [isLoading, setIsLoading] = useState(false)

  // Fetch categories on mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    getCategories()
  }, [])

  // Fetch products when sortField, sortOrder, or selectedCategory changes
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)

      try {
        const products = await fetchProducts(
          selectedCategory,
          sortField,
          sortOrder,
        )

        if (products === null) {
          setIsLoading(false)
          return
        }

        setAllProducts(products)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getProducts()
  }, [sortField, sortOrder, selectedCategory])

  // Handlers
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    // Additional logic like resetting pagination can be added here
  }

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value)
    // Additional logic like resetting pagination can be added here
  }

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value)
    // Additional logic like resetting pagination can be added here
  }

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value)
    // Additional logic like resetting pagination can be added here
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    // Additional logic like resetting pagination can be added here
  }

  return (
    <FilterContext.Provider
      value={{
        allProducts,
        categories,
        selectedCategory,
        selectedPriceRange,
        searchTerm,
        debouncedSearchTerm,
        sortField,
        sortOrder,
        isLoading,
        handleCategoryChange,
        handlePriceRangeChange,
        handleSortFieldChange,
        handleSortOrderChange,
        handleSearchChange,
        setDebouncedSearchTerm,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
