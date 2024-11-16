import { useContext } from "react"
import { FilterContext } from "../../../../context/FilterContext"
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const CategoryFilter = () => {
  const { categories, selectedCategory, handleCategoryChange } =
    useContext(FilterContext)

  return (
    <>
      <div className="my-2">
        <Label htmlFor="category">Kategorije:</Label>
      </div>
      <Select
        value={selectedCategory || "all"}
        onValueChange={(value) =>
          handleCategoryChange({
            /* if we select "all"(All Categories) we turn it to empty 
            string which is a default state that shows all items */
            target: { value: value === "all" ? "" : value },
          })
        }
      >
        <SelectTrigger id="category">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-36 overflow-y-auto md:max-h-60">
          <SelectItem value="all">All Categories</SelectItem>

          {categories &&
            categories.map((category) => (
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
