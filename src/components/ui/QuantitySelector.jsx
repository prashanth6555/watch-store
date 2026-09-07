import { Minus, Plus } from "lucide-react"

export default function QuantitySelector({ value, onChange, min = 1, max = 20 }) {
  return (
    <div className="inline-flex items-center border border-white/15">
      <button
        type="button"
        className="grid h-11 w-11 place-items-center text-[#c9a962] hover:bg-white/5"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="min-w-10 text-center text-sm">{value}</span>
      <button
        type="button"
        className="grid h-11 w-11 place-items-center text-[#c9a962] hover:bg-white/5"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
