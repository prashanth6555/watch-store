import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Layout from "./components/layout/Layout.jsx"
import Cart from "./pages/Cart.jsx"
import Checkout from "./pages/Checkout.jsx"
import Collection from "./pages/Collection.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import OrderSuccess from "./pages/OrderSuccess.jsx"
import ProductDetails from "./pages/ProductDetails.jsx"
import Signup from "./pages/Signup.jsx"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/watches" element={<Collection />} />
          <Route path="/watches/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
