import { Link } from "react-router-dom"
import Button from "../components/ui/Button.jsx"

export default function OrderSuccess() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center animate-fade-up">
      <div className="gold-line mx-auto mb-8 w-16" />
      <p className="text-[11px] tracking-[0.42em] uppercase text-[#c9a962]">Confirmed</p>
      <h1 className="mt-3 font-serif text-5xl">Your order is placed</h1>
      <p className="mt-5 text-sm leading-relaxed text-[#9a958c]">
        A concierge will email authentication papers and shipping details shortly. Thank you for choosing Aureum.
      </p>
      <Link to="/watches" className="mt-10 inline-block">
        <Button>Return to boutique</Button>
      </Link>
    </div>
  )
}
