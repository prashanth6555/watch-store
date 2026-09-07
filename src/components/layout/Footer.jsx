import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 md:px-6">
        <div>
          <p className="font-serif text-3xl tracking-[0.28em]">AUREUM</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#9a958c]">
            A private house of luxury timepieces. Authenticated. Curated. Delivered worldwide.
          </p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a962]">Maison</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[#f5f0e8]/80">
            <Link to="/watches" className="hover:text-[#c9a962]">Collection</Link>
            <Link to="/watches?sort=new" className="hover:text-[#c9a962]">New Arrivals</Link>
            <Link to="/cart" className="hover:text-[#c9a962]">Cart</Link>
            <Link to="/login" className="hover:text-[#c9a962]">Client Login</Link>
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a962]">Atelier</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[#f5f0e8]/80">
            <span>Boutiques · Geneva · Paris · Mumbai</span>
            <span>hello@aureum.house</span>
            <span>+41 22 555 0140</span>
            <span>Mon–Sat, 10:00–19:00</span>
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a962]">Follow</p>
          <div className="mt-4 flex gap-4 text-[11px] tracking-[0.2em] uppercase text-[#f5f0e8]/80">
            <a href="https://instagram.com" className="hover:text-[#c9a962]">Instagram</a>
            <a href="https://facebook.com" className="hover:text-[#c9a962]">Facebook</a>
            <a href="https://x.com" className="hover:text-[#c9a962]">X</a>
          </div>
        </div>
      </div>
      <div className="gold-line" />
      <p className="px-4 py-6 text-center text-[11px] tracking-[0.18em] uppercase text-[#9a958c]">
        © {new Date().getFullYear()} Aureum House · All rights reserved
      </p>
    </footer>
  )
}
