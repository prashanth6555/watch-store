import { testimonials } from "../../data/products.js"
import SectionHeading from "../ui/SectionHeading.jsx"

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <SectionHeading eyebrow="Clientele" title="Testimonials" subtitle="Notes from collectors who trust Aureum with their next chapter." />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item, i) => (
          <blockquote
            key={item.id}
            className="reveal border border-white/10 bg-[#111] p-8 transition-colors hover:border-[#c9a962]/40"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <p className="font-serif text-2xl italic leading-snug text-[#f5f0e8]">“{item.quote}”</p>
            <footer className="mt-8">
              <p className="text-sm">{item.name}</p>
              <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-[#c9a962]">{item.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
