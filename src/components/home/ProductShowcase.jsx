import { Link } from "react-router-dom"
import ProductCard from "../ui/ProductCard.jsx"
import SectionHeading from "../ui/SectionHeading.jsx"
import Button from "../ui/Button.jsx"

export default function ProductShowcase({ eyebrow, title, subtitle, products, to }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={i * 80} />
        ))}
      </div>
      <div className="mt-12 text-center reveal">
        <Link to={to}>
          <Button variant="outline">View All</Button>
        </Link>
      </div>
    </section>
  )
}
