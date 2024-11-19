import React from "react"
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"

import Home from "./contentComponents/regularComponents/Home/Home"
import Cart from "./contentComponents/Cart/Cart"
import Layout from "./contentComponents/Layout/Layout"
import Authorization from "./contentComponents/Authorization/Authorization"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="kosarica" element={<Cart />} />
      <Route path="auth" element={<Authorization />} />
    </Route>,
  ),
)

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App
