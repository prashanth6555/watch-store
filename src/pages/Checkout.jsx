import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import { formatPrice } from "../data/products.js"
import Button from "../components/ui/Button.jsx"
import EmptyState from "../components/ui/EmptyState.jsx"

const initial = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  postal: "",
  payment: "card",
  card: "",
  expiry: "",
  cvc: "",
}

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    ...initial,
    fullName: user?.name || "",
    email: user?.email || "",
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (items.length === 0) {
    return (
      <EmptyState
        title="Nothing to checkout"
        message="Add a watch to your tray before placing an order."
        actionLabel="Shop collection"
        to="/watches"
      />
    )
  }

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = "Name is required."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Valid email required."
    if (!/^[0-9+\-\s]{8,}$/.test(form.phone)) next.phone = "Valid phone required."
    if (!form.address.trim()) next.address = "Address is required."
    if (!form.city.trim()) next.city = "City is required."
    if (!form.country.trim()) next.country = "Country is required."
    if (!form.postal.trim()) next.postal = "Postal code is required."
    if (form.payment === "card") {
      if (!/^\d{16}$/.test(form.card.replace(/\s/g, ""))) next.card = "Enter a 16-digit card number."
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) next.expiry = "Use MM/YY."
      if (!/^\d{3,4}$/.test(form.cvc)) next.cvc = "Invalid CVC."
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const placeOrder = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setTimeout(() => {
      clearCart()
      navigate("/order-success")
    }, 900)
  }

  const field = (name, label, props = {}) => (
    <label className="block text-sm">
      <span className="mb-2 block text-[11px] tracking-[0.2em] uppercase text-[#9a958c]">{label}</span>
      <input
        value={form[name]}
        onChange={(e) => set(name, e.target.value)}
        className="w-full border border-white/15 bg-transparent px-3 py-3"
        {...props}
      />
      {errors[name] && <span className="mt-1 block text-xs text-red-400">{errors[name]}</span>}
    </label>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="font-serif text-4xl md:text-5xl">Checkout</h1>
      <div className="gold-line my-6 w-20" />

      <form onSubmit={placeOrder} className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <section>
            <h2 className="font-serif text-2xl">Customer details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {field("fullName", "Full name")}
              {field("email", "Email", { type: "email" })}
              <div className="sm:col-span-2">{field("phone", "Phone")}</div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl">Shipping address</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">{field("address", "Street address")}</div>
              {field("city", "City")}
              {field("country", "Country")}
              {field("postal", "Postal code")}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl">Payment method</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["card", "Card"],
                ["paypal", "PayPal"],
                ["cod", "Bank transfer"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set("payment", value)}
                  className={`border px-4 py-3 text-sm ${
                    form.payment === value ? "border-[#c9a962] text-[#c9a962]" : "border-white/15"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {form.payment === "card" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">{field("card", "Card number", { placeholder: "ACCT-000015" })}</div>
                {field("expiry", "Expiry", { placeholder: "MM/YY" })}
                {field("cvc", "CVC", { placeholder: "123" })}
              </div>
            )}
            {form.payment === "paypal" && (
              <p className="mt-4 text-sm text-[#9a958c]">You will complete payment with PayPal after placing the order.</p>
            )}
            {form.payment === "cod" && (
              <p className="mt-4 text-sm text-[#9a958c]">Our concierge will share secure bank details by email.</p>
            )}
          </section>
        </div>

        <aside className="h-fit border border-white/10 bg-[#111] p-6">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3 text-sm">
                <img src={item.images[0]} alt="" className="h-16 w-16 object-cover" />
                <div className="flex-1">
                  <p>{item.name}</p>
                  <p className="text-[#9a958c]">Qty {item.quantity}</p>
                </div>
                <p>{formatPrice(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#9a958c]">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9a958c]">Shipping</span>
              <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between pt-2 text-base">
              <span>Total</span>
              <span className="text-[#c9a962]">{formatPrice(total)}</span>
            </div>
          </div>
          <Button type="submit" className="mt-8 w-full" disabled={submitting}>
            {submitting ? "Placing order..." : "Place Order"}
          </Button>
        </aside>
      </form>
    </div>
  )
}
