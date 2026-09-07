import { brands } from "../../data/products.js"
import { Link } from "react-router-dom"

export default function BrandSection() {
  const loop = [...brands, ...brands]

  return (
    <section className="overflow-hidden border-y border-white/10 py-10">
      <p className="mb-8 text-center text-[11px] tracking-[0.42em] uppercase text-[#c9a962]">Maisons</p>
      <div className="flex w-[200%] animate-marquee">
        {loop.map((brand, i) => (
          <Link
            key={`${brand}-${i}`}
            to={`/watches?brand=${encodeURIComponent(brand)}`}
            className="w-1/12 shrink-0 text-center font-serif text-3xl md:text-4xl text-white/40 transition-colors hover:text-[#c9a962]"
          >
            {brand}
          </Link>
        ))}
      </div>
    </section>
  )
}
