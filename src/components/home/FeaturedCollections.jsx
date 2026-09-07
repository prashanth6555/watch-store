import { Link } from "react-router-dom"
import { collections } from "../../data/products.js"
import SectionHeading from "../ui/SectionHeading.jsx"

export default function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <SectionHeading
        eyebrow="The House"
        title="Featured Collections"
        subtitle="Three worlds of horology — heritage dress pieces, instruments of the sea, and open-worked atelier complications."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {collections.map((item, i) => (
          <Link
            key={item.title}
            to={`/watches?category=${encodeURIComponent(item.category)}`}
            className="group relative min-h-[380px] overflow-hidden reveal"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a962]">{item.subtitle}</p>
              <h3 className="mt-2 font-serif text-4xl">{item.title}</h3>
              <span className="mt-4 inline-block text-[11px] tracking-[0.28em] uppercase text-white/80 group-hover:text-[#c9a962]">
                Discover →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
