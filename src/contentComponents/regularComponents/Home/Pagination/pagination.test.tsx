import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

  it("disable the previous button when on the first page", () => {
    const handlePreviousPage = vi.fn()
    const handleNextPage = vi.fn()

    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />,
    )

    const previousButton = screen.getByText("Prethodna stranica")
    expect(previousButton).toBeDisabled()
  })

  it("disable the next button when on the last page", () => {
    const handlePreviousPage = vi.fn()
    const handleNextPage = vi.fn()

    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />,
    )

    const nextButton = screen.getByText("Sljedeća stranica")
    expect(nextButton).toBeDisabled()
  })

  it("call handlePreviousPage when previous button is clicked", async () => {
    const user = userEvent.setup()
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
    expect(previousButton).toBeEnabled()

    await user.click(previousButton)
    expect(handlePreviousPage).toHaveBeenCalled()
  })

  it("call handleNextPage when next button is clicked", async () => {
    const user = userEvent.setup()
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

    const nextButton = screen.getByText("Sljedeća stranica")
    expect(nextButton).toBeEnabled()

    await user.click(nextButton)
    expect(handleNextPage).toHaveBeenCalled()
  })

  it("show current page and total pages", () => {
    const handlePreviousPage = vi.fn()
    const handleNextPage = vi.fn()

    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />,
    )

    expect(screen.getByText("3")).toBeInTheDocument()
    expect(screen.getByText("of")).toBeInTheDocument()
    expect(screen.getByText("5")).toBeInTheDocument()
  })
})
