export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignClass = align === "left" ? "text-left items-start" : "text-center items-center"

  return (
    <div className={`reveal mb-10 md:mb-14 flex flex-col ${alignClass}`}>
      {eyebrow && (
        <p className="mb-3 text-[11px] tracking-[0.42em] uppercase text-[#c9a962]">{eyebrow}</p>
      )}
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8]">{title}</h2>
      <div className="gold-line my-5 w-24" />
      {subtitle && <p className="max-w-xl text-sm md:text-base text-[#9a958c] leading-relaxed">{subtitle}</p>}
    </div>
  )
}
