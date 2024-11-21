import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, within } from "@testing-library/react"
import Home from "./Home"
import { FilterContext } from "../../../context/FilterContext"
import {
  FilterContextType,
  Product,
} from "../../../context/FilterContext.types"

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Product A",
    brand: "Brand A",
    availabilityStatus: "In Stock",
    category: "Electronics",
    description: "Description of Product A",
    price: 50,
    rating: 4.5,
    stock: 10,
    thumbnail: "imageA.jpg",
    images: ["imageA.jpg"],
    warrantyInformation: "1 year",
    reviews: [],
  },
  {
    id: 2,
    title: "Product B",
    brand: "Brand B",
    availabilityStatus: "In Stock",
    category: "Furniture",
    description: "Description of Product B",
    price: 150,
    rating: 4.0,
    stock: 5,
    thumbnail: "imageB.jpg",
    images: ["imageB.jpg"],
    warrantyInformation: "2 years",
    reviews: [],
  },
  {
    id: 3,
    title: "Product C",
    brand: "Brand C",
    availabilityStatus: "In Stock",
    category: "Appliances",
    description: "Description of Product C",
    price: 100,
    rating: 4.8,
    stock: 8,
    thumbnail: "imageC.jpg",
    images: ["imageC.jpg"],
    warrantyInformation: "1.5 years",
    reviews: [],
  },
]

const defaultContextValues: FilterContextType = {
  allProducts: [],
  categories: [],
  selectedCategory: "",
  selectedPriceRange: "",
  selectedProduct: null,
  searchTerm: "",
  debouncedSearchTerm: "",
  sortField: "title",
  sortOrder: "asc",
  isLoading: false,
  cart: {},
  isDialogOpen: false,
  isLoggedIn: false,
  userInfo: null,
  handleCategoryChange: vi.fn(),
  handlePriceRangeChange: vi.fn(),
  handleSortFieldChange: vi.fn(),
  handleSortOrderChange: vi.fn(),
  handleSearchChange: vi.fn(),
  handleAddToCart: vi.fn(),
  handleRemoveFromCart: vi.fn(),
  handleCardClick: vi.fn(),
  handleDialogOpen: vi.fn(),
  handleLoggedIn: vi.fn(),
  setDebouncedSearchTerm: vi.fn(),
  setUserInfo: vi.fn(),
}

// Helper function to render Home with context
const renderWithContext = (overrides: Partial<FilterContextType> = {}) => {
  const contextValues = { ...defaultContextValues, ...overrides }
  return render(
    <FilterContext.Provider value={contextValues}>
      <Home />
    </FilterContext.Provider>,
  )
}

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("render loading state when isLoading is true", () => {
    renderWithContext({ isLoading: true })
    expect(screen.getByText("Učitavanje...")).toBeInTheDocument()
  })

  it("render ProductList and Pagination when products are available", () => {
    renderWithContext({ allProducts: mockProducts })
    expect(screen.getByText("Product A")).toBeInTheDocument()
    expect(screen.getByText("Product B")).toBeInTheDocument()
    expect(screen.getByText("Prethodna stranica")).toBeInTheDocument()
    expect(screen.getByText("Sljedeća stranica")).toBeInTheDocument()
  })

  it("apply price range filter", () => {
    renderWithContext({
      allProducts: mockProducts,
      selectedPriceRange: "10-50",
    })
    expect(screen.queryByText("Product A")).toBeInTheDocument()
    expect(screen.queryByText("Product B")).not.toBeInTheDocument()
    expect(screen.queryByText("Product C")).not.toBeInTheDocument()
  })

  it("apply search term filter", () => {
    renderWithContext({
      allProducts: mockProducts,
      debouncedSearchTerm: "Product B",
    })
    expect(screen.getByText("Product B")).toBeInTheDocument()
    expect(screen.queryByText("Product A")).not.toBeInTheDocument()
    expect(screen.queryByText("Product C")).not.toBeInTheDocument()
  })

  it('shows "Trenutno nema proizvoda!" message when no match', () => {
    renderWithContext({
      allProducts: mockProducts,
      debouncedSearchTerm: "Non-existent Product",
    })
    expect(screen.getByText("Trenutno nema proizvoda!")).toBeInTheDocument()
  })

  it("apply sortField filter", () => {
    renderWithContext({
      allProducts: mockProducts,
      sortField: "price",
      sortOrder: "asc",
    })

    const expectedOrder = ["Product A", "Product C", "Product B"]

    const productItems = screen.getAllByRole("listitem")

    const productTitles = productItems.map((item) =>
      within(item)
        .getByText((content) => expectedOrder.includes(content))
        .textContent?.trim(),
    )

    expect(productTitles).toEqual(expectedOrder)
  })

  it('apply sortField "price" and sortOrder "desc"', () => {
    renderWithContext({
      allProducts: mockProducts,
      sortField: "price",
      sortOrder: "desc",
    })

    const expectedOrder = ["Product B", "Product C", "Product A"]

    const productItems = screen.getAllByRole("listitem")

    const productTitles = productItems.map((item) =>
      within(item)
        .getByText((content) => expectedOrder.includes(content))
        .textContent?.trim(),
    )

    expect(productTitles).toEqual(expectedOrder)
  })
})
