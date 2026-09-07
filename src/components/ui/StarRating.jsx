import { Star } from "lucide-react"

export default function StarRating({ value = 5, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(value) ? "fill-[#c9a962] text-[#c9a962]" : "text-white/20"}
        />
      ))}
    </div>
  )
}
