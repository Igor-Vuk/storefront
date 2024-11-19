import { createContext, useState, useEffect } from "react"
import { fetchCategories, fetchProducts } from "../api/api"
import {
  FilterProviderProps,
  Product,
  Category,
  CartItem,
  FilterContextType,
  InputChangeEvent,
} from "./FilterContext.types"

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
)

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("")
  const [sortField, setSortField] = useState<"title" | "price">("title")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cart, setCart] = useState<Record<number, CartItem>>({})
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart") || "{}")
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

        if (!products) {
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
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }

  const handlePriceRangeChange = (value: string) => {
    setSelectedPriceRange(value)
  }

  const handleSortFieldChange = (value: "title" | "price") => {
    setSortField(value)
  }

  const handleSortOrderChange = (value: "asc" | "desc") => {
    setSortOrder(value)
  }

  const handleSearchChange = (e: InputChangeEvent) => {
    setSearchTerm(e.target.value)
  }

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  const handleDialogOpen = (value: boolean) => {
    setIsDialogOpen(value)
  }

  const handleAddToCart = (product: Product, change = 1) => {
    /* Add or remove items one by one from the cart */
    setCart((prevCart) => {
      // Deep copy the cart to avoid mutating the original state
      const updatedCart = JSON.parse(JSON.stringify(prevCart))

      if (updatedCart[product.id]) {
        const newQuantity = updatedCart[product.id].quantity + change

        if (newQuantity > 0) {
          updatedCart[product.id].quantity = newQuantity
        } else {
          delete updatedCart[product.id]
        }
      } else if (change > 0) {
        updatedCart[product.id] = { ...product, quantity: 1 }
      }

      sessionStorage.setItem("cart", JSON.stringify(updatedCart))

      return updatedCart
    })
  }

  const handleRemoveFromCart = (productId: number) => {
    // Remove multiple items at once
    setCart((prevCart) => {
      const updatedCart = { ...prevCart }
      delete updatedCart[productId]
      sessionStorage.setItem("cart", JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  const handleLoggedIn = (value: boolean) => {
    setIsLoggedIn(value)
  }

  return (
    <FilterContext.Provider
      value={{
        allProducts,
        categories,
        selectedCategory,
        selectedPriceRange,
        selectedProduct,
        searchTerm,
        debouncedSearchTerm,
        sortField,
        sortOrder,
        isLoading,
        cart,
        isDialogOpen,
        isLoggedIn,
        handleCategoryChange,
        handlePriceRangeChange,
        handleSortFieldChange,
        handleSortOrderChange,
        handleSearchChange,
        setDebouncedSearchTerm,
        handleAddToCart,
        handleRemoveFromCart,
        handleCardClick,
        handleDialogOpen,
        handleLoggedIn,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
