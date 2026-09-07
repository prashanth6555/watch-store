import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { formatPrice, getProductById, getRelated } from "../data/products.js"
import { useCart } from "../context/CartContext.jsx"
import { useScrollReveal } from "../hooks/useScrollReveal.js"
import Button from "../components/ui/Button.jsx"
import QuantitySelector from "../components/ui/QuantitySelector.jsx"
import StarRating from "../components/ui/StarRating.jsx"
import ProductCard from "../components/ui/ProductCard.jsx"
import EmptyState from "../components/ui/EmptyState.jsx"

export default function ProductDetails() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [active, setActive] = useState(0)

  useScrollReveal(product?.id)

  useEffect(() => {
    setQty(1)
    setActive(0)
    if (product) document.title = `${product.name} | AUREUM`
  }, [product])

  if (!product) {
    return (
      <EmptyState
        title="Piece not found"
        message="This timepiece is no longer in the boutique."
        actionLabel="Back to collection"
        to="/watches"
      />
    )
  }

  const related = getRelated(product)
  const specs = [
    ["Case Material", product.specs.caseMaterial],
    ["Strap Material", product.specs.strapMaterial],
    ["Movement", product.specs.movement],
    ["Water Resistance", product.specs.waterResistance],
    ["Dial Color", product.specs.dialColor],
  ]

  const buyNow = () => {
    addToCart(product, qty)
    navigate("/checkout")
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <p className="text-[11px] tracking-[0.22em] uppercase text-[#9a958c]">
        <Link to="/watches" className="hover:text-[#c9a962]">Collection</Link>
        <span> / {product.brand}</span>
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="animate-fade-in">
          <div className="overflow-hidden bg-[#111] aspect-square">
            <img
              src={product.images[active]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                className={`overflow-hidden border ${i === active ? "border-[#c9a962]" : "border-transparent"}`}
              >
                <img src={src} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="animate-fade-up">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a962]">{product.brand}</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <StarRating value={product.rating} />
            <span className="text-xs text-[#9a958c]">{product.reviewsCount} reviews</span>
          </div>
          <div className="mt-6 flex items-end gap-4">
            <span className="text-3xl">{formatPrice(product.price)}</span>
            <span className="text-[#9a958c] line-through">{formatPrice(product.originalPrice)}</span>
            <span className="bg-[#c9a962] px-2 py-1 text-[10px] tracking-[0.16em] uppercase text-[#0a0a0a]">
              Save {product.discount}%
            </span>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-[#cfc8bc]">{product.description}</p>

          <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {specs.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between py-3 text-sm">
                <dt className="text-[#9a958c]">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantitySelector value={qty} onChange={setQty} max={product.stock} />
            <span className="text-xs text-[#9a958c]">{product.stock} available</span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1" onClick={() => addToCart(product, qty)}>
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1" onClick={buyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-serif text-3xl md:text-4xl">Customer reviews</h2>
        <div className="gold-line my-6 w-20" />
        <div className="grid gap-5 md:grid-cols-3">
          {product.reviews.map((review) => (
            <article key={review.id} className="reveal border border-white/10 p-6">
              <StarRating value={review.rating} />
              <p className="mt-4 font-serif text-xl italic">“{review.text}”</p>
              <p className="mt-6 text-sm">{review.name}</p>
              <p className="text-xs text-[#9a958c]">{review.date}</p>
            </article>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-20 mb-10">
          <h2 className="font-serif text-3xl md:text-4xl">Related watches</h2>
          <div className="gold-line my-6 w-20" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, i) => (
              <ProductCard key={item.id} product={item} delay={i * 80} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
