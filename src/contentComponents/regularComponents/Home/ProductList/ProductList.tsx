import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { truncateText } from "../../../../helpers/truncateText.ts"
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
            className="mb-4 flex w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <Card
              className="flex size-full cursor-pointer flex-col"
              onClick={() => handleCardClick(product)}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {product.title}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  ${product.price}
                </CardDescription>
              </CardHeader>
              {product.thumbnail && (
                <div className="aspect-w-1 aspect-h-1 flex w-full items-center justify-center bg-white">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-contain"
                  />
                </div>
              )}
              <CardContent className="grow">
                <p className="mt-2 text-gray-700">
                  {truncateText(product.description, 100)}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <button className="mt-2 rounded bg-green-600 px-4 py-2 text-white">
                  Dodaj
                </button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>

      {/* Dialog for Product Details */}
      {selectedProduct && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedProduct.title}
              </DialogTitle>
              <DialogDescription>
                {/* Neki proizvodi nemaju brend pa izgleda koda je cijena u minusu */}
                {selectedProduct.brand} - ${selectedProduct.price}
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
                            className="h-auto w-full object-contain"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {/* Navigation buttons positioned below the images */}
                    <div className="mt-2 flex justify-center space-x-4">
                      <CarouselPrevious className="rounded bg-gray-200 p-2">
                        Prev
                      </CarouselPrevious>
                      <CarouselNext className="rounded bg-gray-200 p-2">
                        Next
                      </CarouselNext>
                    </div>
                  </Carousel>
                ) : selectedProduct.images &&
                  selectedProduct.images.length === 1 ? (
                  <img
                    src={selectedProduct.thumbnail}
                    alt={selectedProduct.title}
                    className="h-auto w-full object-contain"
                  />
                ) : (
                  "No images"
                )}
              </div>

              {/* Product Details */}
              <div>
                <p className="mb-4 text-gray-700">
                  {selectedProduct.description}
                </p>
                <ul className="mb-4 list-inside list-disc text-gray-700">
                  <li>Category: {selectedProduct.category}</li>
                  <li>Brand: {selectedProduct.brand}</li>
                  <li>Stock: {selectedProduct.stock}</li>
                  <li>SKU: {selectedProduct.sku}</li>
                  <li>Rating: {selectedProduct.rating}</li>
                  <li>Warranty: {selectedProduct.warrantyInformation}</li>
                  <li>Availability: {selectedProduct.availabilityStatus}</li>
                </ul>
                <Button className="bg-green-600 text-white">
                  Dodaj u košaricu
                </Button>
              </div>
            </div>
            {/* Reviews */}
            {selectedProduct.reviews && selectedProduct.reviews.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 text-xl font-semibold">Recenzije</h3>
                {selectedProduct.reviews.map((review, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center">
                      <div className="mr-2 text-yellow-500">
                        {Array(review.rating)
                          .fill()
                          .map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                      </div>
                      <span className="text-gray-700">
                        {review.reviewerName}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Zatvori</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default ProductList
