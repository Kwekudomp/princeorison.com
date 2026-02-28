import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import StatsBar from "@/components/StatsBar";
import CollectionCard from "@/components/CollectionCard";
import BrandStory from "@/components/BrandStory";
import ValuesGrid from "@/components/ValuesGrid";
import CTASection from "@/components/CTASection";
import { collections } from "@/data/collections";

const heroImages = [
  { src: "/images/hero/hero-2.jpeg", alt: "Prince Orison fashion showcase" },
  { src: "/images/hero/hero-3.jpeg", alt: "Prince Orison fashion showcase" },
  { src: "/images/hero/hero-4.jpeg", alt: "Prince Orison fashion showcase" },
  { src: "/images/hero/hero-5.jpeg", alt: "Prince Orison fashion showcase" },
];

export default function Home() {
  return (
    <>
      {/* ── Section 1: Hero ──────────────────────────────── */}
      <section className="min-h-screen flex items-center bg-bg-primary pt-24 pb-16 px-[5%]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Carousel — on mobile appears first, on desktop appears last */}
          <div className="order-first lg:order-last">
            <HeroCarousel images={heroImages} />
          </div>

          {/* Text content */}
          <div>
            <span className="inline-block bg-text-primary text-white px-5 py-2 rounded-full text-xs tracking-[2px] uppercase font-semibold">
              DETAILED TO PERFECTION
            </span>

            <h1 className="font-display text-5xl lg:text-7xl font-light leading-[1.1] mt-6">
              Where Craftsmanship
              <span className="font-semibold block">Meets Elegance</span>
            </h1>

            <p className="text-lg text-text-secondary mt-6 leading-relaxed max-w-lg">
              Creating refined, contemporary African fashion that blends
              structure, craftsmanship, and timeless elegance for the modern
              individual.
            </p>

            <div className="flex gap-4 mt-8 flex-wrap">
              <Link
                href="/collections"
                className="bg-accent text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Explore Collections
              </Link>
              <a
                href="https://wa.me/233245099930"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-text-primary text-text-primary px-8 py-4 rounded-full font-medium tracking-wide hover:bg-text-primary hover:text-white transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Stats Bar ─────────────────────────── */}
      <StatsBar />

      {/* ── Section 3: Featured Collections ──────────────── */}
      <section className="py-24 px-[5%]">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
            OUR COLLECTIONS
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light mt-4 leading-tight">
            Curated for the Discerning Individual
          </h2>
          <p className="text-text-secondary mt-6 text-lg">
            From structured agbadas to contemporary casual wear, each collection
            embodies our commitment to excellence.
          </p>
        </div>

        {/* Collection cards grid */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.slice(0, 6).map((col, i) => (
            <CollectionCard key={col.slug} collection={col} index={i} />
          ))}
        </div>

        {/* View all link */}
        <Link
          href="/collections"
          className="text-accent font-medium hover:text-accent-dark transition text-center block mt-12 text-lg"
        >
          View All Collections &rarr;
        </Link>
      </section>

      {/* ── Section 4: Brand Story ───────────────────────── */}
      <BrandStory />

      {/* ── Section 5: Values ────────────────────────────── */}
      <section className="py-24 px-[5%]">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
            WHY CHOOSE US
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light mt-4 leading-tight">
            What Makes Us Different
          </h2>
          <p className="text-text-secondary mt-6 text-lg">
            We don&apos;t chase trends; we create timeless pieces that speak to
            quality, exclusivity, and intention.
          </p>
        </div>

        <ValuesGrid />
      </section>

      {/* ── Section 6: CTA ───────────────────────────────── */}
      <CTASection
        title="Let's Create Something Exceptional"
        subtitle="Schedule a consultation or visit our showroom in Accra to experience the Prince Orison difference."
        secondaryHref="/collections"
        secondaryLabel="Explore Collections"
      />
    </>
  );
}
