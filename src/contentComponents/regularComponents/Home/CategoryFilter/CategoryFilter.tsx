import { useContext } from "react"
import { FilterContext } from "../../../../context/FilterContext"

const CategoryFilter = () => {
  const { categories, selectedCategory, handleCategoryChange } =
    useContext(FilterContext)

  return (
    <div>
      <label htmlFor="category">Category: </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter
