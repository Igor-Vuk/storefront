import { Category, Product, UserInfo } from "../context/FilterContext.types"

const BASE_URL = "https://dummyjson.com"

const apiEndpoints = {
  LOGIN: `${BASE_URL}/auth/login`,
  REFRESH: `${BASE_URL}/auth/refresh`,
  PRODUCTS: `${BASE_URL}/products`,
  CATEGORIES: `${BASE_URL}/products/categories`,
}

const { LOGIN, REFRESH, PRODUCTS, CATEGORIES } = apiEndpoints

const fetchCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(CATEGORIES)
    const data = await res.json()

    if (!res.ok) {
      console.error("Fetch category response", data)
      throw new Error("Failed to fetch categories")
    }

    return data
  } catch (error) {
    console.error("Fetch category error:", error)
    throw error
  }
}

const fetchProducts = async (
  selectedCategory: string,
  sortField: string,
  sortOrder: string,
): Promise<Product[]> => {
  try {
    const baseProductUrl = selectedCategory
      ? `${PRODUCTS}/category/${selectedCategory}`
      : PRODUCTS

    const fetchURL = `${baseProductUrl}?limit=0&sortBy=${sortField}&order=${sortOrder}`

    const res = await fetch(fetchURL)
    const data = await res.json()

    if (!res.ok) {
      console.error("Fetch products response", data)
      throw new Error("Failed to fetch products")
    }

    return data.products
  } catch (error) {
    console.error("Fetch products error:", error)
    throw error
  }
}

const loginUser = async (
  username: string,
  password: string,
): Promise<UserInfo> => {
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

const refreshToken = async (
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string }> => {
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

    return data as { accessToken: string; refreshToken: string }
  } catch (error) {
    console.error("Token refresh error:", error)
    throw error
  }
}

export { fetchCategories, fetchProducts, loginUser, refreshToken }
