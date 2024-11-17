import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { FilterContext } from "../../context/FilterContext"
import { Button } from "@/components/ui/button"

const Cart = () => {
  const { cart, handleAddToCart } = useContext(FilterContext)

  /* Total price */
  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-6">Košarica</h1>
      {Object.keys(cart).length === 0 ? (
        <p>Nema proizvoda u košarici.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {Object.values(cart).map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <p className="text-gray-600">Količina: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    className="w-8 h-8 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none active:bg-red-800 flex items-center justify-center"
                    onClick={() => handleAddToCart(item, -1)}
                  >
                    -
                  </Button>
                  <Button
                    className="w-8 h-8 rounded bg-green-600 text-white hover:bg-green-700 focus:outline-none active:bg-green-800 flex items-center justify-center"
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
