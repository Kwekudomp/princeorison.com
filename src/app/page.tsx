import HeroFullscreen from "@/components/HeroFullscreen";
import NewArrivals from "@/components/NewArrivals";
import FloatingMosaic from "@/components/FloatingMosaic";
import VideoSection from "@/components/VideoSection";
import CollectionCard from "@/components/CollectionCard";
import BrandStory from "@/components/BrandStory";
import ValuesGrid from "@/components/ValuesGrid";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { collections } from "@/data/collections";

const heroImages = [
  { src: "/images/products/kaftan-casual/shirts-casual-5.jpeg", alt: "All-white kaftan set by Prince Orison" },
  { src: "/images/products/agbada-3-piece/kaftan-agbada-1.jpeg", alt: "Royal Burgundy Agbada by Prince Orison" },
  { src: "/images/products/groomswear/groomswear-4.jpeg", alt: "Lavender groomswear by Prince Orison" },
  { src: "/images/hero/hero-4.jpeg", alt: "Prince Orison fashion showcase" },
];

export default function Home() {
  return (
    <>
      {/* 1. Cinematic Editorial Hero */}
      <HeroFullscreen images={heroImages} />

      {/* 2. New Arrivals */}
      <NewArrivals />

      {/* 3. Floating Mosaic */}
      <FloatingMosaic />

      {/* 4. Featured Collections */}
      <section className="py-24 px-[5%]">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
              OUR COLLECTIONS
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-4 leading-tight">
              Curated for the Discerning Individual
            </h2>
            <p className="text-text-secondary mt-6 text-lg">
              From structured agbadas to contemporary casual wear, each
              collection embodies our commitment to excellence.
            </p>
          </div>
        </ScrollReveal>

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

      {/* 5. Behind The Craft — video section */}
      <VideoSection />

      {/* 6. Brand Story */}
      <BrandStory />

      {/* 7. Values */}
      <section className="py-24 px-[5%] bg-bg-surface">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
              WHY CHOOSE US
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-4 leading-tight">
              What Makes Us Different
            </h2>
            <p className="text-text-secondary mt-6 text-lg">
              We don&apos;t chase trends; we create timeless pieces that speak
              to quality, exclusivity, and intention.
            </p>
          </div>
        </ScrollReveal>
        <ValuesGrid />
      </section>

      {/* 8. Final CTA */}
      <CTASection
        title="Let's Create Something Exceptional"
        subtitle="Schedule a consultation or visit our showroom in Accra to experience the Prince Orison difference."
        secondaryHref="/collections"
        secondaryLabel="Explore Collections"
      />
    </>
  );
}
