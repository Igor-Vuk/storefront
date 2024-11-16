import { useContext, useState, useEffect } from "react"
import { FilterContext } from "../../../context/FilterContext"

import ProductList from "./ProductList/ProductList"
import Pagination from "./Pagination/Pagination"

const Home = () => {
  const {
    allProducts,
    selectedPriceRange,
    searchTerm,
    setDebouncedSearchTerm,
    selectedCategory,
    debouncedSearchTerm,
    sortField,
    sortOrder,
    isLoading,
  } = useContext(FilterContext)

  // Local state for products to display and pagination
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const itemsPerPage = 20

  // Update products whenever relevant states change
  useEffect(() => {
    if (allProducts.length > 0) {
      let filteredProducts = [...allProducts]

      // Apply price range filter
      if (selectedPriceRange !== "") {
        if (selectedPriceRange === "100+") {
          filteredProducts = filteredProducts.filter(
            (product) => product.price >= 100,
          )
        } else {
          const [minPrice, maxPrice] = selectedPriceRange.split("-")
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.price >= parseFloat(minPrice) &&
              product.price <= parseFloat(maxPrice),
          )
        }
      }

      // Apply search filter
      if (debouncedSearchTerm !== "") {
        const searchTermLower = debouncedSearchTerm.toLowerCase()
        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(searchTermLower),
        )
      }

      // Apply sorting
      filteredProducts.sort((a, b) => {
        if (sortField === "title") {
          const titleA = a.title.toLowerCase()
          const titleB = b.title.toLowerCase()
          if (titleA < titleB) return sortOrder === "asc" ? -1 : 1
          if (titleA > titleB) return sortOrder === "asc" ? 1 : -1
          return 0
        } else if (sortField === "price") {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price
        }
        return 0
      })

      // Update total pages
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage))

      // Get current page products
      const indexOfLastItem = currentPage * itemsPerPage
      const indexOfFirstItem = indexOfLastItem - itemsPerPage
      setProducts(filteredProducts.slice(indexOfFirstItem, indexOfLastItem))
    } else {
      setProducts([])
      setTotalPages(0)
    }
  }, [
    allProducts,
    currentPage,
    selectedPriceRange,
    debouncedSearchTerm,
    sortField,
    sortOrder,
  ])

  // Debounce the search term input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [
    selectedCategory,
    selectedPriceRange,
    debouncedSearchTerm,
    sortField,
    sortOrder,
  ])

  return (
    <div className="p-4">
      {/* Products List */}
      {isLoading ? (
        <p className="text-center">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <>
          <ProductList products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </>
      )}
    </div>
  )
}

export default Home
