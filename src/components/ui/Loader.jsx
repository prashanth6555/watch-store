export default function Loader() {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border border-[#c9a962]/20" />
        <div className="absolute inset-1 rounded-full border-t border-[#c9a962] animate-spin" />
        <div className="absolute inset-4 rounded-full border border-[#c9a962]/40 animate-spin-slow" />
      </div>
    </div>
  )
}
