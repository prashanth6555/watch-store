import { Link } from "react-router-dom"
import Button from "../ui/Button.jsx"

export default function PromoBanner() {
  return (
    <section className="relative my-8 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=2000&q=80"
        alt="Promotional banner"
        className="h-[420px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[11px] tracking-[0.42em] uppercase text-[#c9a962]">Private Sale</p>
        <h2 className="mt-4 font-serif text-4xl md:text-6xl">Complimentary worldwide delivery</h2>
        <p className="mt-4 max-w-lg text-sm text-[#d8d2c8]/80">
          On every timepiece above ₹5,000. Authenticated, insured, and presented in maison packaging.
        </p>
        <Link to="/watches" className="mt-8">
          <Button>Shop the Collection</Button>
        </Link>
      </div>
    </section>
  )
}
