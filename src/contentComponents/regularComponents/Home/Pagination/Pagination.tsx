const Pagination = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <div className="px-2 text-base">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="mr-2"
      >
        Prethodna stranica
      </button>
      <span>
        <b>{currentPage}</b> of <b>{totalPages}</b>
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="ml-2"
      >
        Sljedeća stranica
      </button>
    </div>
  )
}

export default Pagination
