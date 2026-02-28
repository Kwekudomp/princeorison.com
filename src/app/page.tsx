import Link from "next/link";
import HeroFullscreen from "@/components/HeroFullscreen";
import FloatingMosaic from "@/components/FloatingMosaic";
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
      {/* ── Section 1: Immersive Hero ──────────────────── */}
      <HeroFullscreen images={heroImages} />

      {/* ── Section 2: Floating Mosaic Showcase ────────── */}
      <FloatingMosaic />

      {/* ── Section 3: Featured Collections ────────────── */}
      <section className="py-24 px-[5%]">
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

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.slice(0, 6).map((col, i) => (
            <CollectionCard key={col.slug} collection={col} index={i} />
          ))}
        </div>

        <Link
          href="/collections"
          className="text-accent font-medium hover:text-accent-dark transition text-center block mt-12 text-lg"
        >
          View All Collections &rarr;
        </Link>
      </section>

      {/* ── Section 4: Brand Story ─────────────────────── */}
      <BrandStory />

      {/* ── Section 5: Values ──────────────────────────── */}
      <section className="py-24 px-[5%]">
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

      {/* ── Section 6: CTA ─────────────────────────────── */}
      <CTASection
        title="Let's Create Something Exceptional"
        subtitle="Schedule a consultation or visit our showroom in Accra to experience the Prince Orison difference."
        secondaryHref="/collections"
        secondaryLabel="Explore Collections"
      />
    </>
  );
}
