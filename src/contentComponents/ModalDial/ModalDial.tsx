import React, { useContext } from "react"
import { FilterContext } from "../../context/FilterContext"

import { Button } from "@/components/ui/button"

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

const ModalDial: React.FC = () => {
  const {
    cart,
    selectedProduct,
    isDialogOpen,
    handleAddToCart,
    handleDialogOpen,
  } = useContext(FilterContext)!

  if (!selectedProduct) {
    return null
  }

  const renderDialog = () => {
    const {
      title,
      brand,
      price,
      description,
      category,
      stock,
      rating,
      warrantyInformation,
      availabilityStatus,
      images,
      thumbnail,
      reviews,
    } = selectedProduct

    return (
      <Dialog open={isDialogOpen} onOpenChange={() => handleDialogOpen(false)}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <DialogHeader className="mb-4 border-b border-gray-200 pb-4">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              {brand && `${brand} -`} ${price}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
            {/* Carousel for Images */}
            <div className="m-10">
              {images && images.length > 1 ? (
                <Carousel orientation="horizontal">
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={image}
                          alt={`${title} ${index + 1}`}
                          className="h-auto max-h-[300px] w-full max-w-screen-sm rounded-lg object-contain shadow-md sm:max-h-[500px] sm:max-w-screen-md"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="mt-4 flex justify-center space-x-4">
                    <CarouselPrevious className="rounded bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300">
                      Prev
                    </CarouselPrevious>
                    <CarouselNext className="rounded bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300">
                      Next
                    </CarouselNext>
                  </div>
                </Carousel>
              ) : (
                <img
                  src={thumbnail}
                  alt={title}
                  className="h-auto w-full rounded-lg object-contain shadow-md"
                />
              )}
            </div>

            <div>
              <p className="mb-4 text-gray-700">{description}</p>
              <ul className="mb-4 list-inside list-disc text-gray-700">
                <li className="py-2">
                  <b>Kategorija:</b> {category}
                </li>
                <li className="py-2">
                  <b>Brand:</b> {brand}
                </li>
                <li className="py-2">
                  <b>Količina:</b> {stock}
                </li>
                <li className="py-2">
                  <b>Ocjena:</b> {rating}
                </li>
                <li className="py-2">
                  <b>Garancija:</b> {warrantyInformation}
                </li>
                <li className="py-2">
                  <b>Dostupnost:</b> {availabilityStatus}
                </li>
              </ul>
              <div className="flex items-center space-x-4">
                <Button
                  className="rounded bg-green-600 px-4 py-2 text-white transition-colors duration-200 focus:bg-green-600 focus:outline-none focus-visible:ring-0 active:bg-green-700 md:hover:bg-green-700"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  Dodaj u košaricu
                </Button>
                {cart[selectedProduct.id] && (
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

          {reviews && reviews.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Recenzije
              </h3>
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="mb-4 border-b border-gray-200 pb-4 last:border-0"
                >
                  <div className="flex items-center">
                    <div className="mr-2 text-yellow-500">
                      {Array(review.rating)
                        .fill("")
                        .map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                    </div>
                    <span className="font-medium text-gray-700">
                      {review.reviewerName}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
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
    )
  }

  return <>{selectedProduct ? renderDialog() : null}</>
}

export default ModalDial
