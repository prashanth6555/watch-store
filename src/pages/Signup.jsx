import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "../context/AuthContext.jsx"
import Button from "../components/ui/Button.jsx"

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" })
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState("")

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (form.name.trim().length < 2) next.name = "Please enter your full name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email."
    if (form.password.length < 6) next.password = "Password must be at least 6 characters."
    if (form.password !== form.confirm) next.confirm = "Passwords do not match."
    setErrors(next)
    if (Object.keys(next).length) return
    try {
      signup(form)
      navigate("/")
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
      <form onSubmit={submit} className="mx-auto w-full max-w-md animate-fade-up">
        <p className="text-[11px] tracking-[0.42em] uppercase text-[#c9a962]">Atelier</p>
        <h1 className="mt-2 font-serif text-4xl">Create your account</h1>
        <p className="mt-3 text-sm text-[#9a958c]">Join the house for private allocations and first looks.</p>

        {formError && <p className="mt-4 text-sm text-red-400">{formError}</p>}

        {[
          ["name", "Full name", "text"],
          ["email", "Email", "email"],
        ].map(([key, label, type]) => (
          <label key={key} className="mt-5 block text-sm">
            <span className="mb-2 block text-[11px] tracking-[0.2em] uppercase text-[#9a958c]">{label}</span>
            <input
              value={form[key]}
              onChange={(e) => set(key, e.target.value)}
              className="w-full border border-white/15 bg-transparent px-3 py-3"
              type={type}
            />
            {errors[key] && <span className="mt-1 block text-xs text-red-400">{errors[key]}</span>}
          </label>
        ))}

        <label className="mt-5 block text-sm">
          <span className="mb-2 block text-[11px] tracking-[0.2em] uppercase text-[#9a958c]">Password</span>
          <div className="relative">
            <input
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              className="w-full border border-white/15 bg-transparent px-3 py-3 pr-12"
              type={show ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a958c]"
              onClick={() => setShow((v) => !v)}
              aria-label="Toggle password visibility"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <span className="mt-1 block text-xs text-red-400">{errors.password}</span>}
        </label>

        <label className="mt-5 block text-sm">
          <span className="mb-2 block text-[11px] tracking-[0.2em] uppercase text-[#9a958c]">Confirm password</span>
          <input
            value={form.confirm}
            onChange={(e) => set("confirm", e.target.value)}
            className="w-full border border-white/15 bg-transparent px-3 py-3"
            type={show ? "text" : "password"}
          />
          {errors.confirm && <span className="mt-1 block text-xs text-red-400">{errors.confirm}</span>}
        </label>

        <Button type="submit" className="mt-8 w-full">Create account</Button>
        <p className="mt-6 text-sm text-[#9a958c]">
          Already a client?{" "}
          <Link to="/login" className="text-[#c9a962] hover:underline">Sign in</Link>
        </p>
      </form>
      <div className="hidden md:block overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=1200&q=80"
          alt="Watch on marble"
          className="h-[560px] w-full object-cover"
        />
      </div>
    </div>
  )
}
