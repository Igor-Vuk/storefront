import React, { useContext } from "react"
import { FilterContext } from "../../../../context/FilterContext"
import { truncateText } from "../../../../helpers/truncateText.ts"
import { ProductListProps } from "../../../../context/FilterContext.types"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { cart, handleCardClick } = useContext(FilterContext)!

  return (
    <ul className="flex flex-wrap">
      {products.map((product) => (
        <li
          key={product.id}
          className="mb-6 w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <Card className="flex h-full flex-col rounded-lg bg-white shadow-md transition-transform duration-300 md:hover:scale-95 md:hover:shadow-2xl">
            <CardHeader className="border-b border-gray-200 p-4">
              <CardTitle className="text-lg font-semibold text-gray-800">
                {product.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                ${product.price}
              </CardDescription>
            </CardHeader>
            {product.thumbnail && (
              <div className="flex w-full items-center justify-center bg-gray-100">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="max-h-48 object-contain"
                />
              </div>
            )}
            <CardContent className="grow p-4">
              <p className="text-sm text-gray-700">
                {truncateText(product.description, 100)}
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t border-gray-200 p-4">
              <Button
                className="rounded bg-green-600 px-4 py-2 text-white transition-colors duration-200 focus:bg-green-600 focus:outline-none active:bg-green-700 md:hover:bg-green-700"
                onClick={() => handleCardClick(product)}
              >
                Detalji
              </Button>

              {/* If this item is in our Cart, show how many we have them */}
              {cart[product.id] && (
                <div className="flex items-center space-x-2">
                  <span className="inline-block rounded bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                    {cart[product.id].quantity}
                  </span>
                  <span className="text-sm text-gray-600">u košarici</span>
                </div>
              )}
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default ProductList
