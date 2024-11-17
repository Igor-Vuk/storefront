import { useState, useContext } from "react"
import { FilterContext } from "../../../../context/FilterContext"
import { truncateText } from "../../../../helpers/truncateText.ts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

const ProductList = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { cart, handleAddToCart } = useContext(FilterContext)

  const handleCardClick = (product) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  return (
    <>
      <ul className="flex flex-wrap">
        {products.map((product) => (
          <li
            key={product.id}
            className="mb-6 flex w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <Card className="flex h-full  flex-col rounded-lg shadow-md md:hover:shadow-2xl md:hover:scale-95 transition-transform duration-300 bg-white">
              <CardHeader className="border-b border-gray-200 p-4">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {product.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  ${product.price}
                </CardDescription>
              </CardHeader>
              {product.thumbnail && (
                <div className="aspect-w-1 aspect-h-1 flex w-full items-center justify-center bg-gray-100">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-contain max-h-48"
                  />
                </div>
              )}
              <CardContent className="flex-grow p-4">
                <p className="text-sm text-gray-700">
                  {truncateText(product.description, 100)}
                </p>
              </CardContent>
              <CardFooter className="border-t border-gray-200 p-4 flex justify-between items-center">
                <Button
                  className="rounded bg-green-600 px-4 py-2 text-white transition-colors duration-200 md:hover:bg-green-700 focus:outline-none focus:bg-green-600 active:bg-green-700"
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

      {/* Dialog for Product Details */}
      {selectedProduct && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-lg shadow-lg p-6 bg-white border border-gray-200">
            <DialogHeader className="mb-4 border-b border-gray-200 pb-4">
              <DialogTitle className="text-2xl font-bold text-gray-800">
                {selectedProduct.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                {selectedProduct.brand && `${selectedProduct.brand} -`} $
                {selectedProduct.price}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
              {/* Carousel for Images */}
              <div className="m-10">
                {selectedProduct.images && selectedProduct.images.length > 1 ? (
                  <Carousel orientation="horizontal">
                    <CarouselContent>
                      {selectedProduct.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <img
                            src={image}
                            alt={`${selectedProduct.title} ${index + 1}`}
                            className="h-auto w-full max-w-screen-sm sm:max-w-screen-md max-h-[300px] sm:max-h-[500px] rounded-lg object-contain shadow-md"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="mt-4 flex justify-center space-x-4">
                      <CarouselPrevious className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 transition-colors">
                        Prev
                      </CarouselPrevious>
                      <CarouselNext className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 transition-colors">
                        Next
                      </CarouselNext>
                    </div>
                  </Carousel>
                ) : (
                  <img
                    src={selectedProduct.thumbnail}
                    alt={selectedProduct.title}
                    className="h-auto w-full rounded-lg object-contain shadow-md"
                  />
                )}
              </div>

              {/* Product Details */}
              <div>
                <p className="mb-4 text-gray-700">
                  {selectedProduct.description}
                </p>
                <ul className="mb-4 list-inside list-disc text-gray-700">
                  <li className="py-2">
                    <b>Kategorija:</b> {selectedProduct.category}
                  </li>
                  <li className="py-2">
                    <b>Brand:</b> {selectedProduct.brand}
                  </li>
                  <li className="py-2">
                    <b>Količina:</b> {selectedProduct.stock}
                  </li>
                  <li className="py-2">
                    <b>Ocjena:</b> {selectedProduct.rating}
                  </li>
                  <li className="py-2">
                    <b>Garancija:</b> {selectedProduct.warrantyInformation}
                  </li>
                  <li className="py-2">
                    <b>Dostupnost:</b> {selectedProduct.availabilityStatus}
                  </li>
                </ul>
                <div className="flex items-center space-x-4">
                  <Button
                    className="rounded bg-green-600 px-4 py-2 text-white transition-colors duration-200 md:hover:bg-green-700 focus:outline-none focus-visible:ring-0 focus:bg-green-600 active:bg-green-700"
                    onClick={() => handleAddToCart(selectedProduct)}
                  >
                    Dodaj u košaricu
                  </Button>
                  {cart[selectedProduct?.id] && (
                    <div className="space-x-2">
                      <span className="inline-block rounded bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                        {cart[selectedProduct.id].quantity}
                      </span>
                      <span className="text-sm text-gray-600">u košarici</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {selectedProduct.reviews && selectedProduct.reviews.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                  Recenzije
                </h3>
                {selectedProduct.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="mb-4 border-b border-gray-200 pb-4 last:border-0"
                  >
                    <div className="flex items-center">
                      <div className="mr-2 text-yellow-500">
                        {Array(review.rating)
                          .fill()
                          .map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                      </div>
                      <span className="text-gray-700 font-medium">
                        {review.reviewerName}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <DialogFooter className="mt-6 border-t border-gray-200 pt-4">
              <DialogClose asChild>
                <Button className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Zatvori
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default ProductList
