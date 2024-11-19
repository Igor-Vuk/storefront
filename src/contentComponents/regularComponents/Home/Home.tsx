import React, { useContext, useState, useEffect } from "react"
import { FilterContext } from "../../../context/FilterContext"
import { Product } from "../../../context/FilterContext.types"

import ProductList from "./ProductList/ProductList"
import Pagination from "./Pagination/Pagination"

const Home: React.FC = () => {
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
  } = useContext(FilterContext)!

  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const itemsPerPage = 20

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      let filteredProducts = [...allProducts]

      /* We are doing the price range filtering on the frontend 
      since API doesn't support it */
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

      /* If search term changes, than debouncedSearchTerm changes also after 500ms.
      We take that search term, make it lower case and filter items based on it  */
      if (debouncedSearchTerm !== "") {
        const searchTermLower = debouncedSearchTerm.toLowerCase()
        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(searchTermLower),
        )
      }

      /* Items filtered based on price range or search term need to be sorted by 
      title or price in ascending or descending order*/
      filteredProducts.sort((a, b) => {
        if (sortField === "title") {
          const titleA = a.title.toLowerCase()
          const titleB = b.title.toLowerCase()
          return sortOrder === "asc"
            ? titleA.localeCompare(titleB)
            : titleB.localeCompare(titleA)
        } else if (sortField === "price") {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price
        }
        return 0
      })

      /* Update total pages based on filteredProducts */
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage))
      /* We set max of 20 items per page. Here we slice 20 items from filteredProducts
      to show them on current page */
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  /* Anytime we change some of the filters we reset current page back to 1 */
  useEffect(() => {
    setCurrentPage(1)
  }, [
    selectedCategory,
    selectedPriceRange,
    debouncedSearchTerm,
    sortField,
    sortOrder,
  ])

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

  return (
    <div className="p-4">
      {isLoading ? (
        <p className="text-center">Učitavanje...</p>
      ) : products.length === 0 ? (
        <p className="text-center">Trenutno nema proizvoda!</p>
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
