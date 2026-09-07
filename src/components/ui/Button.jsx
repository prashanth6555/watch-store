export default function Button({
  children,
  variant = "gold",
  className = "",
  type = "button",
  ...props
}) {
  const styles = {
    gold: "bg-[#c9a962] text-[#0a0a0a] hover:bg-[#e4d4a8]",
    outline:
      "border border-[#c9a962] text-[#c9a962] bg-transparent hover:bg-[#c9a962] hover:text-[#0a0a0a]",
    ghost: "text-[#f5f0e8] hover:text-[#c9a962] bg-transparent",
    dark: "bg-[#141414] text-[#f5f0e8] border border-white/10 hover:border-[#c9a962]",
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-xs tracking-[0.22em] uppercase font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
