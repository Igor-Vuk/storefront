const BASE_URL = "https://dummyjson.com"

const apiEndpoints = {
  PRODUCTS: `${BASE_URL}/products`,
  CATEGORIES: `${BASE_URL}/products/categories`,
}

const { PRODUCTS, CATEGORIES } = apiEndpoints

const fetchCategories = async () => {
  try {
    const res = await fetch(CATEGORIES)
    const data = await res.json()

    if (!res.ok) {
      console.error("Fetch category response", data)
      return
    }

    return data // Assuming data is an array of category names
  } catch (error) {
    console.error("Fetch category error", error)
    return
  }
}

const fetchProducts = async (selectedCategory, sortField, sortOrder) => {
  try {
    /* If we didn't select category, fetch all products */
    const baseProductUrl = selectedCategory
      ? `${PRODUCTS}/category/${selectedCategory}`
      : PRODUCTS

    const fetchURL = `${baseProductUrl}?limit=0&sortBy=${sortField}&order=${sortOrder}`

    const res = await fetch(fetchURL)
    const data = await res.json()

    if (!res.ok) {
      console.error("Fetch products response", data)
      return
    }

    return data.products
  } catch (error) {
    console.error("Fetch products error", error)
    return
  }
}

export { fetchCategories, fetchProducts }
