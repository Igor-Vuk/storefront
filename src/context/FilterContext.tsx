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
  const [cart, setCart] = useState({})

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || {}
    setCart(storedCart)
  }, [])

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

  /* Fetch products when sortField, sortOrder, or selectedCategory changes. 
  We do it like this in larger scale applications. Since API doesn't support 
  fetching based on price range, we do the filtering on the frontend for it. */
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
  }

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value)
  }

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value)
  }

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleAddToCart = (product, change = 1) => {
    let updatedCart
    setCart((prevCart) => {
      updatedCart = { ...prevCart }

      if (updatedCart[product.id]) {
        // Update the quantity
        updatedCart[product.id].quantity += change

        // Remove the product if the quantity is zero or less
        if (updatedCart[product.id].quantity <= 0) {
          delete updatedCart[product.id]
        }
      } else if (change > 0) {
        // Add a new product to the cart
        updatedCart[product.id] = {
          ...product,
          quantity: 1,
        }
      }

      return updatedCart
    })

    // Update sessionStorage with the new cart
    sessionStorage.setItem("cart", JSON.stringify(updatedCart))
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
        cart,
        handleCategoryChange,
        handlePriceRangeChange,
        handleSortFieldChange,
        handleSortOrderChange,
        handleSearchChange,
        setDebouncedSearchTerm,
        handleAddToCart,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
