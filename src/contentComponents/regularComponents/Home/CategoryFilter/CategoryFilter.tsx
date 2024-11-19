import React, { useContext } from "react"
import { FilterContext } from "../../../../context/FilterContext"
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Category } from "../../../../context/FilterContext.types"

const CategoryFilter: React.FC = () => {
  const { categories, selectedCategory, handleCategoryChange } =
    useContext(FilterContext)!

  const handleChange = (value: string) => {
    /* if we select "all"(All Categories) we turn it to empty 
      string which is a default state that shows all items */
    const selectedValue = value === "all" ? "" : value
    handleCategoryChange(selectedValue)
  }

  return (
    <>
      <div className="my-2">
        <Label htmlFor="category">Kategorije:</Label>
      </div>
      <Select value={selectedCategory || "all"} onValueChange={handleChange}>
        <SelectTrigger id="category">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-36 overflow-y-auto md:max-h-60">
          <SelectItem value="all">All Categories</SelectItem>
          {categories &&
            categories.map((category: Category) => (
              <SelectItem key={category.slug} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  )
}

export default CategoryFilter
