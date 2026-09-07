import { createContext, useContext, useEffect, useMemo, useState } from "react"

const AuthContext = createContext(null)
const USER_KEY = "aureum-user"
const USERS_KEY = "aureum-users"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(USER_KEY)
  }, [user])

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
    } catch {
      return []
    }
  }

  const signup = ({ name, email, password }) => {
    const users = getUsers()
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email already exists.")
    }
    const next = { name, email, password }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, next]))
    setUser({ name, email })
  }

  const login = ({ email, password }) => {
    const users = getUsers()
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )
    if (!found) throw new Error("Invalid email or password.")
    setUser({ name: found.name, email: found.email })
  }

  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, signup, login, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
