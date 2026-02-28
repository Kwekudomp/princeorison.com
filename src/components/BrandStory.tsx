import Image from "next/image";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="bg-bg-surface py-24 px-[5%]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left side — text */}
        <div>
          <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
            OUR STORY
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light mt-4 leading-tight">
            The Art of Refined African Fashion
          </h2>
          <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
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
          <Link
            href="/about"
            className="inline-block mt-6 text-accent font-medium hover:text-accent-dark transition"
          >
            Learn More &rarr;
          </Link>
        </div>

        {/* Right side — image */}
        <div>
          <Image
            src="/images/about/workshop.jpeg"
            alt="Prince Orison workshop in Accra, Ghana"
            width={600}
            height={800}
            className="rounded-[20px] object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
