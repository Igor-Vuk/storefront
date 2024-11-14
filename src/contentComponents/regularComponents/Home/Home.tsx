import { useEffect, useState } from "react"
import { fetchCategories, fetchProducts } from "../../../api/api"
import SearchBar from "./SearchBar/SearchBar"
import CategoryFilter from "./CategoryFilter/CategoryFilter"
import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFilter"
import SortControls from "./SortControls/SortControls"
import ProductList from "./ProductList/ProductList"

const Home = () => {
  /* Holds all the products fetched from the API */
  const [allProducts, setAllProducts] = useState([])
  /* Holds the products to display on the current page */
  const [products, setProducts] = useState([])
  /* Tracks the current page number */
  const [currentPage, setCurrentPage] = useState(1)
  /* Total number of pages based on the number of products */
  const [totalPages, setTotalPages] = useState(0)
  /* Property by which products are sorted - "title" or "price" */
  const [sortField, setSortField] = useState("title")
  /* Order by which products are sorted - "asc" or "desc" */
  const [sortOrder, setSortOrder] = useState("asc")
  /* Number of products displayed per page */
  const itemsPerPage = 20
  /* Holds the list of categories */
  const [categories, setCategories] = useState([])
  /* Holds the selected category slug */
  const [selectedCategory, setSelectedCategory] = useState("")
  /* Holds the selected price range */
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  /* Holds the search term entered by the user */
  const [searchTerm, setSearchTerm] = useState("")
  /* Copies the search term entered by user after 300ms */
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  /* Indicates if data is currently being fetched */
  const [isLoading, setIsLoading] = useState(false)
  /* Price Ranges */
  const priceRanges = [
    { label: "All Prices", value: "" },
    { label: "Up to $10", value: "0-10" },
    { label: "$10 - $50", value: "10-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "Over $100", value: "100+" },
  ]

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories()
      setCategories(data)
    }

    getCategories()
  }, [])

  useEffect(() => {
    /* Fetch products whenever sortField, sortOrder, or selectedCategory changes */
    const getProducts = async () => {
      setIsLoading(true) // Start loading

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
      setIsLoading(false) // End loading after data is set
    }

    getProducts()
  }, [sortField, sortOrder, selectedCategory])

  /* Debounce the search term input */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    // Cancel the timeout if the value changes before 300ms is out
    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  // Update products whenever relevant states change
  useEffect(() => {
    if (allProducts.length > 0) {
      // Filter products based on selected price range and search term
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

      if (debouncedSearchTerm !== "") {
        /* turn setDebouncedSearchTerm to lowercase so uppercase search terms also work */
        const searchTermLower = debouncedSearchTerm.toLowerCase()
        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(searchTermLower),
        )
      }

      /* Update total pages based on filtered products */
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage))

      const indexOfLastItem = currentPage * itemsPerPage
      const indexOfFirstItem = indexOfLastItem - itemsPerPage
      setProducts(filteredProducts.slice(indexOfFirstItem, indexOfLastItem))
    } else {
      setProducts([])
      setTotalPages(0)
    }
  }, [allProducts, currentPage, selectedPriceRange, debouncedSearchTerm])

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    setCurrentPage(1)
  }

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value)
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

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

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value)
    setCurrentPage(1)
  }

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />

      <PriceRangeFilter
        priceRanges={priceRanges}
        selectedPriceRange={selectedPriceRange}
        handlePriceRangeChange={handlePriceRangeChange}
      />

      <SortControls
        sortField={sortField}
        sortOrder={sortOrder}
        handleSortFieldChange={handleSortFieldChange}
        handleSortOrderChange={handleSortOrderChange}
      />

      {/* Products List */}
      {isLoading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ProductList
          products={products}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      )}
    </div>
  )
}

export default Home
