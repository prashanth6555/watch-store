import { Link } from "react-router-dom"
import { Trash2 } from "lucide-react"
import { useCart } from "../context/CartContext.jsx"
import { formatPrice } from "../data/products.js"
import Button from "../components/ui/Button.jsx"
import QuantitySelector from "../components/ui/QuantitySelector.jsx"
import EmptyState from "../components/ui/EmptyState.jsx"

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal, shipping, total } = useCart()

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your tray is empty"
        message="Begin with a piece from the collection — dress, dive, or complication."
        actionLabel="Browse watches"
        to="/watches"
      />
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="font-serif text-4xl md:text-5xl">Shopping Cart</h1>
      <div className="gold-line my-6 w-20" />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <ul className="divide-y divide-white/10">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col gap-4 py-6 sm:flex-row animate-fade-in">
              <Link to={`/watches/${item.id}`} className="h-32 w-full shrink-0 overflow-hidden bg-[#111] sm:w-32">
                <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row">
                <div>
                  <p className="text-[11px] tracking-[0.24em] uppercase text-[#c9a962]">{item.brand}</p>
                  <Link to={`/watches/${item.id}`} className="font-serif text-2xl hover:text-[#c9a962]">
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(value) => updateQuantity(item.id, value)}
                    max={item.stock}
                  />
                  <p className="w-24 text-right text-sm">{formatPrice(item.price * item.quantity)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#9a958c] hover:text-red-400"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit border border-white/10 bg-[#111] p-6">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#9a958c]">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9a958c]">Shipping</span>
              <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
            </div>
            <div className="gold-line" />
            <div className="flex justify-between text-base">
              <span>Total</span>
              <span className="text-[#c9a962]">{formatPrice(total)}</span>
            </div>
          </div>
          <Link to="/checkout" className="mt-8 block">
            <Button className="w-full">Checkout</Button>
          </Link>
          <Link to="/watches" className="mt-3 block">
            <Button variant="ghost" className="w-full">Continue shopping</Button>
          </Link>
        </aside>
      </div>
    </div>
  )
}
