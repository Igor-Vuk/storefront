import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"

import Home from "./contentComponents/regularComponents/Home/Home"
import Cart from "./contentComponents/Cart/Cart"
import Layout from "./contentComponents/Layout/Layout"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="kosarica" element={<Cart />} />
    </Route>,
  ),
)

export default function App() {
  return <RouterProvider router={router} />
}
