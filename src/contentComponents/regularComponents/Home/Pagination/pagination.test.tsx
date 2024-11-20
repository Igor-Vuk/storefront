import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import Pagination from "./Pagination"

describe("Pagination component", () => {
  it("shows previous and next buttons", () => {
    const handlePreviousPage = vi.fn()
    const handleNextPage = vi.fn()

    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />,
    )

    const previousButton = screen.getByText("Prethodna stranica")
    expect(previousButton).toBeInTheDocument()

    const nextButton = screen.getByText("Sljedeća stranica")
    expect(nextButton).toBeInTheDocument()
  })
})
