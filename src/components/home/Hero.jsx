import { Link } from "react-router-dom"
import Button from "../ui/Button.jsx"

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury watch hero"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
      </div>

      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <div className="animate-fade-up">
          <p className="text-[11px] tracking-[0.48em] uppercase text-[#c9a962]">Est. Atelier 1998</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] md:text-6xl lg:text-7xl">
            Time, distilled
            <span className="block italic text-[#c9a962]">into art.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm md:text-base leading-relaxed text-[#d8d2c8]/80">
            Discover authenticated luxury watches — dress, dive, and complications — curated for collectors who demand provenance and presence.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/watches">
              <Button className="animate-pulse-gold">Explore Collection</Button>
            </Link>
            <Link to="/watches?sort=new">
              <Button variant="outline">New Arrivals</Button>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto hidden h-[420px] w-[320px] md:block lg:h-[520px] lg:w-[400px]">
          <div className="absolute inset-0 rounded-full border border-[#c9a962]/20 animate-spin-slow" />
          <div className="absolute inset-8 rounded-full border border-white/10" />
          <img
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80"
            alt="Featured luxury watch"
            className="absolute inset-12 h-[calc(100%-6rem)] w-[calc(100%-6rem)] rounded-full object-cover animate-float shadow-[0_30px_80px_rgba(201,169,98,0.18)]"
          />
        </div>
      </div>
    </section>
  )
}
