import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { FilterContext } from "../../context/FilterContext"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "@radix-ui/react-icons"
import { CartItem } from "../../context/FilterContext.types.ts"

const Cart: React.FC = () => {
  const { cart, handleAddToCart, handleCardClick, handleRemoveFromCart } =
    useContext(FilterContext)!

  /* Total price */
  const totalPrice = Object.values(cart).reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0,
  )

  return (
    <div className="relative p-6">
      <h1 className="mb-6 p-2 text-2xl font-bold">Košarica</h1>
      {Object.keys(cart).length === 0 ? (
        <p>Nema proizvoda u košarici.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {Object.values(cart).map((item: CartItem) => (
              <li key={item.id} className="flex items-center justify-between">
                <div
                  className="flex items-center space-x-4 p-2 transition hover:cursor-pointer hover:bg-gray-100"
                  onClick={() => handleCardClick(item)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="size-16 object-contain"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <p className="text-gray-600">Količina: {item.quantity}</p>

                    <div
                      className="mt-2 flex cursor-pointer items-center space-x-2 text-gray-700 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveFromCart(item.id)
                      }}
                    >
                      <TrashIcon className="size-5" />
                      <span className="text-sm">Obriši</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    className="flex size-8 items-center justify-center rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none active:bg-red-800"
                    onClick={() => handleAddToCart(item, -1)}
                  >
                    -
                  </Button>
                  <Button
                    className="flex size-8 items-center justify-center rounded bg-green-600 text-white hover:bg-green-700 focus:outline-none active:bg-green-800"
                    onClick={() => handleAddToCart(item, 1)}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4 text-right">
            <h2 className="text-xl font-semibold">Ukupna cijena:</h2>
            <p className="text-2xl font-bold text-green-700">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </>
      )}

      <div className="mt-6">
        <NavLink
          to="/"
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none active:bg-green-800"
        >
          Povratak
        </NavLink>
      </div>
    </div>
  )
}

export default Cart
