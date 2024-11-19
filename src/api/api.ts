const BASE_URL = "https://dummyjson.com"

const apiEndpoints = {
  LOGIN: `${BASE_URL}/auth/login`,
  REFRESH: `${BASE_URL}/auth/refresh`,
  PRODUCTS: `${BASE_URL}/products`,
  CATEGORIES: `${BASE_URL}/products/categories`,
}

const { LOGIN, REFRESH, PRODUCTS, CATEGORIES } = apiEndpoints

const fetchCategories = async () => {
  try {
    const res = await fetch(CATEGORIES)
    const data = await res.json()

    if (!res.ok) {
      console.error("Fetch category response", data)
      return
    }

    return data
  } catch (error) {
    console.error("Fetch category error", error)
    return
  }
}

const fetchProducts = async (selectedCategory, sortField, sortOrder) => {
  try {
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

const loginUser = async (username, password) => {
  try {
    const res = await fetch(LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || "Login failed")
    }

    return data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

const refreshToken = async (refreshToken) => {
  try {
    const res = await fetch(REFRESH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || "Token refresh failed")
    }

    return data
  } catch (error) {
    console.error("Token refresh error:", error)
    throw error
  }
}

export { fetchCategories, fetchProducts, loginUser, refreshToken }
