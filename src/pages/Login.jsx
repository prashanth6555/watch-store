import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "../context/AuthContext.jsx"
import Button from "../components/ui/Button.jsx"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState("")

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email."
    if (password.length < 6) next.password = "Password must be at least 6 characters."
    setErrors(next)
    if (Object.keys(next).length) return
    try {
      login({ email, password })
      navigate("/")
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
      <div className="hidden md:block overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524805444758-089113d48a37?auto=format&fit=crop&w=1200&q=80"
          alt="Watch close-up"
          className="h-[520px] w-full object-cover"
        />
      </div>
      <form onSubmit={submit} className="mx-auto w-full max-w-md animate-fade-up">
        <p className="text-[11px] tracking-[0.42em] uppercase text-[#c9a962]">Clientele</p>
        <h1 className="mt-2 font-serif text-4xl">Welcome back</h1>
        <p className="mt-3 text-sm text-[#9a958c]">Sign in to your Aureum account.</p>

        {formError && <p className="mt-4 text-sm text-red-400">{formError}</p>}

        <label className="mt-8 block text-sm">
          <span className="mb-2 block text-[11px] tracking-[0.2em] uppercase text-[#9a958c]">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-white/15 bg-transparent px-3 py-3"
            type="email"
          />
          {errors.email && <span className="mt-1 block text-xs text-red-400">{errors.email}</span>}
        </label>

        <label className="mt-4 block text-sm">
          <span className="mb-2 block text-[11px] tracking-[0.2em] uppercase text-[#9a958c]">Password</span>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <Button type="submit" className="mt-8 w-full">Sign in</Button>
        <p className="mt-6 text-sm text-[#9a958c]">
          New to Aureum?{" "}
          <Link to="/signup" className="text-[#c9a962] hover:underline">Create an account</Link>
        </p>
      </form>
    </div>
  )
}
