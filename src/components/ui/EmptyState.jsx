import { Link } from "react-router-dom"
import Button from "./Button.jsx"

export default function EmptyState({ title, message, actionLabel, to }) {
  return (
    <div className="mx-auto max-w-md py-20 text-center animate-fade-up">
      <div className="gold-line mx-auto mb-8 w-16" />
      <h2 className="font-serif text-4xl">{title}</h2>
      <p className="mt-4 text-sm text-[#9a958c] leading-relaxed">{message}</p>
      {to && (
        <Link to={to} className="mt-8 inline-block">
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </div>
  )
}
