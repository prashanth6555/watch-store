import { Outlet } from "react-router-dom"
import { useCart } from "../../context/CartContext.jsx"
import Footer from "./Footer.jsx"
import Navbar from "./Navbar.jsx"

export default function Layout() {
  const { toast } = useCart()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8]">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 border border-[#c9a962]/40 bg-[#141414] px-5 py-3 text-xs tracking-[0.18em] uppercase text-[#c9a962] shadow-2xl animate-scale-in">
          {toast}
        </div>
      )}
    </div>
  )
}
