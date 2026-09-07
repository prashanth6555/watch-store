import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Menu, Search, ShoppingBag, User, X } from "lucide-react"
import { useCart } from "../../context/CartContext.jsx"
import { useAuth } from "../../context/AuthContext.jsx"

const links = [
  { to: "/", label: "Home" },
  { to: "/watches", label: "Collection" },
  { to: "/watches?sort=new", label: "New Arrivals" },
  { to: "/watches?sort=best", label: "Best Sellers" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll)
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const submitSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/watches?q=${encodeURIComponent(q)}` : "/watches")
    setSearchOpen(false)
    setOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "nav-blur border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <button
          className="lg:hidden text-[#f5f0e8]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>

        <Link to="/" className="font-serif text-2xl md:text-3xl tracking-[0.28em] text-[#f5f0e8]">
          AUREUM
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.28em] uppercase">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className="text-[#f5f0e8]/80 transition-colors hover:text-[#c9a962]"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            className="text-[#f5f0e8] hover:text-[#c9a962] transition-colors"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          {user ? (
            <button
              className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#f5f0e8]/80 hover:text-[#c9a962]"
              onClick={logout}
              title="Sign out"
            >
              <User size={18} />
              {user.name.split(" ")[0]}
            </button>
          ) : (
            <Link to="/login" className="text-[#f5f0e8] hover:text-[#c9a962]" aria-label="Account">
              <User size={18} />
            </Link>
          )}
          <Link to="/cart" className="relative text-[#f5f0e8] hover:text-[#c9a962]" aria-label="Cart">
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-2.5 -top-2 grid h-4 min-w-4 place-items-center bg-[#c9a962] px-1 text-[9px] text-[#0a0a0a]">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={submitSearch} className="border-t border-white/10 px-4 py-3 md:px-6 animate-fade-in">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search watches, brands, collections..."
            className="w-full bg-transparent py-2 text-sm text-[#f5f0e8] placeholder:text-[#9a958c]"
          />
        </form>
      )}

      {open && (
        <nav className="lg:hidden border-t border-white/10 px-6 py-6 flex flex-col gap-5 text-sm tracking-[0.28em] uppercase animate-fade-in">
          {links.map((link) => (
            <NavLink key={link.label} to={link.to} onClick={() => setOpen(false)} className="hover:text-[#c9a962]">
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <button
              className="text-left hover:text-[#c9a962]"
              onClick={() => {
                logout()
                setOpen(false)
              }}
            >
              Sign out
            </button>
          ) : (
            <NavLink to="/login" onClick={() => setOpen(false)} className="hover:text-[#c9a962]">
              Login
            </NavLink>
          )}
        </nav>
      )}
    </header>
  )
}
