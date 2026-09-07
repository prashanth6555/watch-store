import { useEffect } from "react"
import { products } from "../data/products.js"
import { useScrollReveal } from "../hooks/useScrollReveal.js"
import Hero from "../components/home/Hero.jsx"
import FeaturedCollections from "../components/home/FeaturedCollections.jsx"
import ProductShowcase from "../components/home/ProductShowcase.jsx"
import BrandSection from "../components/home/BrandSection.jsx"
import PromoBanner from "../components/home/PromoBanner.jsx"
import Testimonials from "../components/home/Testimonials.jsx"
import Newsletter from "../components/home/Newsletter.jsx"

export default function Home() {
  useScrollReveal()

  useEffect(() => {
    document.title = "AUREUM | Luxury Watch House"
  }, [])

  const featured = products.filter((p) => p.featured).slice(0, 4)
  const arrivals = products.filter((p) => p.newArrival).slice(0, 4)
  const bestsellers = products.filter((p) => p.bestSeller).slice(0, 4)

  return (
    <>
      <Hero />
      <FeaturedCollections />
      <ProductShowcase
        eyebrow="Selection"
        title="Featured Timepieces"
        subtitle="Icons of the current season, chosen by our atelier."
        products={featured}
        to="/watches"
      />
      <BrandSection />
      <ProductShowcase
        eyebrow="Just In"
        title="New Arrivals"
        subtitle="Fresh from the maisons — limited allocations."
        products={arrivals}
        to="/watches?sort=new"
      />
      <PromoBanner />
      <ProductShowcase
        eyebrow="Most Desired"
        title="Best Selling Watches"
        subtitle="The pieces our clients return to, season after season."
        products={bestsellers}
        to="/watches?sort=best"
      />
      <Testimonials />
      <Newsletter />
    </>
  )
}
