import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { brands, categories, products } from "../data/products.js"
import { useScrollReveal } from "../hooks/useScrollReveal.js"
import ProductCard from "../components/ui/ProductCard.jsx"
import EmptyState from "../components/ui/EmptyState.jsx"
import Loader from "../components/ui/Loader.jsx"
import { SlidersHorizontal } from "lucide-react"

export default function Collection() {
  const [params, setParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const q = params.get("q") || ""
  const category = params.get("category") || "All"
  const brand = params.get("brand") || "All"
  const sort = params.get("sort") || "featured"
  const maxPrice = Number(params.get("max") || 30000)

  useScrollReveal(loading)

  useEffect(() => {
    document.title = "Collection | AUREUM"
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [q, category, brand, sort, maxPrice])

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value || value === "All") next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (q) {
      const term = q.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term),
      )
    }
    if (category !== "All") list = list.filter((p) => p.category === category)
    if (brand !== "All") list = list.filter((p) => p.brand === brand)
    list = list.filter((p) => p.price <= maxPrice)

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price)
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price)
    else if (sort === "new") list.sort((a, b) => Number(b.newArrival) - Number(a.newArrival))
    else if (sort === "best") list.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller))
    else list.sort((a, b) => Number(b.featured) - Number(a.featured))

    return list
  }, [q, category, brand, sort, maxPrice])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-10">
        <p className="text-[11px] tracking-[0.42em] uppercase text-[#c9a962]">Boutique</p>
        <h1 className="mt-2 font-serif text-4xl md:text-6xl">The Collection</h1>
        <p className="mt-3 max-w-xl text-sm text-[#9a958c]">
          Filter by maison, category, and price. Every piece is authenticated.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <button
          className="inline-flex items-center gap-2 border border-white/15 px-4 py-2 text-[11px] tracking-[0.22em] uppercase lg:hidden"
          onClick={() => setShowFilters((v) => !v)}
        >
          <SlidersHorizontal size={14} /> Filters
        </button>

        <input
          value={q}
          onChange={(e) => setFilter("q", e.target.value)}
          placeholder="Search watches..."
          className="w-full border border-white/15 bg-transparent px-4 py-2 text-sm lg:max-w-xs"
        />

        <div className={`${showFilters ? "grid" : "hidden"} lg:grid gap-3 sm:grid-cols-2 lg:grid-cols-4 w-full lg:w-auto`}>
          <select
            value={category}
            onChange={(e) => setFilter("category", e.target.value)}
            className="border border-white/15 bg-[#0a0a0a] px-3 py-2 text-sm"
          >
            <option value="All">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={brand}
            onChange={(e) => setFilter("brand", e.target.value)}
            className="border border-white/15 bg-[#0a0a0a] px-3 py-2 text-sm"
          >
            <option value="All">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <label className="flex items-center gap-3 border border-white/15 px-3 py-2 text-sm">
            <span className="whitespace-nowrap text-[#9a958c]">Max ₹{maxPrice.toLocaleString("en-IN")}</span>
            <input
              type="range"
              min="4000"
              max="30000"
              step="500"
              value={maxPrice}
              onChange={(e) => setFilter("max", e.target.value)}
              className="w-full accent-[#c9a962]"
            />
          </label>
          <select
            value={sort}
            onChange={(e) => setFilter("sort", e.target.value)}
            className="border border-white/15 bg-[#0a0a0a] px-3 py-2 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="new">New arrivals</option>
            <option value="best">Best selling</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      {q && (
        <p className="mb-6 text-sm text-[#9a958c]">
          Results for “{q}” · {filtered.length} pieces
        </p>
      )}

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No watches found"
          message="Try another brand, category, or a higher price range."
          actionLabel="Reset collection"
          to="/watches"
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i * 40} />
          ))}
        </div>
      )}
    </div>
  )
}
