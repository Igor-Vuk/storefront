import { Dispatch, SetStateAction, ReactNode, ChangeEvent } from "react"

export interface FilterProviderProps {
  children: ReactNode
}

export type InputChangeEvent = ChangeEvent<HTMLInputElement>

export interface Product {
  id: number
  title: string
  brand: string
  availabilityStatus: string
  category: string
  description: string
  price: number
  rating: number
  stock: number
  thumbnail: string
  images: string[]
  warrantyInformation: string
  reviews: Array<{
    comment: string
    date: string
    rating: number
    reviewerEmail: string
    reviewerName: string
    // [key: string]: any
  }>
  // [key: string]: any
}

export interface ProductListProps {
  products: Product[]
}

export interface Category {
  name: string
  slug: string
  url: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  handlePreviousPage: () => void
  handleNextPage: () => void
}

export interface SortOption {
  label: string
  value: "title" | "price"
}

export interface PriceRangeOption {
  label: string
  value: string
}

export interface OrderOption {
  label: string
  value: "asc" | "desc"
}

export interface FilterContextType {
  allProducts: Product[]
  categories: Category[]
  selectedCategory: string
  selectedPriceRange: string
  selectedProduct: Product | null
  searchTerm: string
  debouncedSearchTerm: string
  sortField: "title" | "price"
  sortOrder: "asc" | "desc"
  isLoading: boolean
  cart: Record<string, CartItem>
  isDialogOpen: boolean
  isLoggedIn: boolean
  handleCategoryChange: (value: string) => void
  handlePriceRangeChange: (value: string) => void
  handleSortFieldChange: (value: "title" | "price") => void
  handleSortOrderChange: (value: "asc" | "desc") => void
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleAddToCart: (product: Product, change?: number) => void
  handleRemoveFromCart: (productId: number) => void
  handleCardClick: (product: Product) => void
  handleDialogOpen: (value: boolean) => void
  handleLoggedIn: (value: boolean) => void
  setDebouncedSearchTerm: Dispatch<SetStateAction<string>>
}
