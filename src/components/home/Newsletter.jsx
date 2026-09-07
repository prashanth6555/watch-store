import { useState } from "react"
import Button from "../ui/Button.jsx"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  const submit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }
    setError("")
    setDone(true)
  }

  return (
    <section className="border-y border-white/10 bg-[#111] px-4 py-20">
      <div className="mx-auto max-w-2xl text-center reveal">
        <p className="text-[11px] tracking-[0.42em] uppercase text-[#c9a962]">Journal</p>
        <h2 className="mt-3 font-serif text-4xl md:text-5xl">Join the inner circle</h2>
        <p className="mt-4 text-sm text-[#9a958c]">
          First access to new arrivals, private sales, and atelier notes.
        </p>
        {done ? (
          <p className="mt-8 text-sm tracking-[0.18em] uppercase text-[#c9a962]">Welcome. You are on the list.</p>
        ) : (
          <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 border border-white/15 bg-transparent px-4 py-3 text-sm"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
        {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
      </div>
    </section>
  )
}
