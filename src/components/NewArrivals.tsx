"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const arrivals = [
  {
    id: "na-1",
    image: "/images/products/kaftan-casual/shirts-casual-5.jpeg",
    collection: "Kaftan Casual",
    slug: "kaftan-casual",
    name: "All-White Kaftan Set",
    tag: "New",
  },
  {
    id: "na-2",
    image: "/images/products/agbada-3-piece/kaftan-agbada-1.jpeg",
    collection: "Agbada",
    slug: "agbada-3-piece",
    name: "Royal Burgundy Agbada",
    tag: "Featured",
  },
  {
    id: "na-3",
    image: "/images/products/groomswear/groomswear-4.jpeg",
    collection: "Groomswear",
    slug: "groomsman-groomswear",
    name: "Lavender & Purple Set",
    tag: "New",
  },
  {
    id: "na-4",
    image: "/images/products/casual/trousers-shorts-1.jpeg",
    collection: "Casual",
    slug: "casual",
    name: "Orange Event Matching Set",
    tag: "New",
  },
  {
    id: "na-5",
    image: "/images/products/rtw-collection/womens-collection-1.jpeg",
    collection: "RTW Collection",
    slug: "rtw-collection",
    name: "Elegant Statement Piece",
    tag: "Featured",
  },
  {
    id: "na-6",
    image: "/images/products/agbada-3-piece/kaftan-agbada-3.jpeg",
    collection: "Agbada",
    slug: "agbada-3-piece",
    name: "Heritage Kente Agbada",
    tag: "Featured",
  },
];

const tickerItems = [
  "KAFTAN", "AGBADA", "GROOMSWEAR", "RTW COLLECTION",
  "CASUAL WEAR", "JALABIYA", "ANKARA BLENDS", "KAFTAN JACKET",
];

export default function NewArrivals() {
  const ticker = [...tickerItems, ...tickerItems]; // duplicate for seamless loop

  return (
    <section id="new-arrivals" className="dark-luxury py-24 overflow-hidden">
      {/* Marquee ticker */}
      <div className="border-y border-white/10 py-3 mb-16">
        <div className="marquee-track">
          <div className="marquee-content">
            {ticker.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 mx-6">
                <span className="text-[11px] tracking-[4px] uppercase font-medium text-white/60">
                  {item}
                </span>
                <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section header */}
      <div className="px-[5%]">
        <motion.div
          className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-[11px] tracking-[4px] uppercase text-accent font-semibold">
              New Arrivals
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light mt-3 text-white leading-tight">
              Fresh From <br className="hidden md:block" />
              The Atelier
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-sm tracking-[2px] uppercase text-white/50 hover:text-accent transition-colors duration-200 self-start md:self-auto cursor-pointer"
          >
            View All Collections &rarr;
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {arrivals.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
            >
              <Link
                href={`/collections/${item.slug}`}
                className="block arrival-card group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#1a1a1a]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Subtle bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Tag badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`text-[10px] tracking-[3px] uppercase font-semibold px-3 py-1 rounded-full ${
                        item.tag === "New"
                          ? "bg-accent text-white"
                          : "bg-white/15 backdrop-blur-sm text-white border border-white/20"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Hover CTA overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs tracking-[3px] uppercase text-white/80 font-medium">
                      View Collection &rarr;
                    </span>
                  </div>
                </div>

                {/* Text below image */}
                <div className="mt-4 px-1">
                  <p className="text-[10px] tracking-[3px] uppercase text-accent/80 font-semibold">
                    {item.collection}
                  </p>
                  <h3 className="font-display text-xl text-white mt-1 font-light leading-snug">
                    {item.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
