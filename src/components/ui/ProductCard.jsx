import { Link } from "react-router-dom"
import { formatPrice } from "../../data/products.js"
import { useCart } from "../../context/CartContext.jsx"
import Button from "./Button.jsx"

export default function ProductCard({ product, delay = 0 }) {
  const { addToCart } = useCart()

  return (
    <article
      className="group reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden bg-[#111] product-shine aspect-[4/5]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.discount > 0 && (
          <span className="absolute left-4 top-4 bg-[#c9a962] px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a]">
            -{product.discount}%
          </span>
        )}
        {product.newArrival && (
          <span className="absolute right-4 top-4 border border-white/40 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-white">
            New
          </span>
        )}
        <div className="absolute inset-x-4 bottom-4 flex gap-2 translate-y-0 opacity-100 transition-all duration-500 md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <Button
            className="flex-1 !px-3 !py-2.5 text-[10px]"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
          <Link to={`/watches/${product.id}`} className="flex-1">
            <Button variant="dark" className="w-full !px-3 !py-2.5 text-[10px] backdrop-blur-md bg-black/60">
              View
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#c9a962]">{product.brand}</p>
        <Link to={`/watches/${product.id}`} className="block">
          <h3 className="font-serif text-2xl text-[#f5f0e8] transition-colors hover:text-[#c9a962]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3 pt-1">
          <span className="text-sm tracking-wide">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-[#9a958c] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
