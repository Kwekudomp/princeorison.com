import { Metadata } from "next";
import Image from "next/image";
import ValuesGrid from "@/components/ValuesGrid";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the story behind Prince Orison Fashion House. Learn about our commitment to refined African fashion, craftsmanship, and timeless elegance from Accra, Ghana.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="pt-32 pb-16 px-[5%] bg-bg-surface">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
            OUR STORY
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light mt-4 leading-tight">
            The Art of Refined African Fashion
          </h1>
        </div>
      </section>

      {/* Brand story section */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — image */}
          <div>
            <Image
              src="/images/about/workshop.jpeg"
              alt="Prince Orison workshop in Accra, Ghana"
              width={600}
              height={800}
              className="rounded-[20px] object-cover shadow-xl"
            />
          </div>

          {/* Right — text */}
          <div className="space-y-6 text-text-secondary leading-relaxed">
            <p>
              Prince Orison Fashion House stands at the intersection of African
              heritage and contemporary design. We create fashion that honors
              tradition while embracing modernity, each piece meticulously
              crafted to elevate your presence.
            </p>
            <p>
              Our focus on structure, fit, and premium finishing sets us apart.
              From the boardroom to ceremonial occasions, Prince Orison designs
              are made for those who understand that true style is eternal.
            </p>
            <p>
              Located in Accra, Ghana, we serve entrepreneurs, professionals,
              creatives, and executive individuals who value craftsmanship and
              refuse to compromise on quality.
            </p>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-24 px-[5%] bg-bg-surface">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
            WHAT WE STAND FOR
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light mt-4 leading-tight">
            Our Values
          </h2>
        </div>
        <ValuesGrid />
      </section>

      {/* Location section */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left — Visit Us */}
          <div>
            <h3 className="text-xs tracking-[3px] uppercase font-semibold mb-6">
              VISIT US
            </h3>
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
              {`Achimota ABC\nAccra, Ghana\nGPS: GE-370-8751`}
            </p>
            <p className="italic text-sm text-text-secondary mt-4">
              Find us: Prince Orison on Maps / Uber / Bolt / Yango
            </p>
          </div>

          {/* Right — Contact */}
          <div>
            <h3 className="text-xs tracking-[3px] uppercase font-semibold mb-6">
              CONTACT
            </h3>
            <div className="space-y-2 text-text-secondary">
              <p>
                <a
                  href="mailto:princeorison1@gmail.com"
                  className="hover:text-accent transition"
                >
                  princeorison1@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+233245099930"
                  className="hover:text-accent transition"
                >
                  +233 24 509 9930
                </a>
              </p>
            </div>

            <h3 className="text-xs tracking-[3px] uppercase font-semibold mt-8 mb-4">
              FOLLOW US
            </h3>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/princeorison"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-text-primary flex items-center justify-center text-xs font-semibold hover:bg-accent hover:border-accent hover:text-white transition-all"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://www.tiktok.com/@princeorison"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-text-primary flex items-center justify-center text-xs font-semibold hover:bg-accent hover:border-accent hover:text-white transition-all"
                aria-label="TikTok"
              >
                TT
              </a>
              <a
                href="https://wa.me/233245099930"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-text-primary flex items-center justify-center text-xs font-semibold hover:bg-accent hover:border-accent hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                WA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Let's Create Something Exceptional"
        subtitle="Schedule a consultation or visit our showroom in Accra to experience the Prince Orison difference."
        secondaryHref="/collections"
        secondaryLabel="Explore Collections"
      />
    </>
  );
}
