"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { Collection } from "@/data/collections";

interface CollectionCardProps {
  collection: Collection;
  index: number;
}

export default function CollectionCard({
  collection,
  index,
}: CollectionCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <Link
        href={`/collections/${collection.slug}`}
        className="block group"
      >
        {/* Glass card wrapper */}
        <div className="glass-card rounded-[20px] p-1.5 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(201,176,107,0.15)]">
          {/* Card with image */}
          <div className="relative aspect-[3/4] rounded-[16px] overflow-hidden">
            {collection.coverImage ? (
              <>
                <Image
                  src={collection.coverImage}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-glass-white via-bg-surface to-glass-white flex items-center justify-center">
                  <span className="text-text-secondary font-display text-2xl text-center px-4">
                    {collection.name}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </>
            )}

            {/* Bottom overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white font-display text-xl font-semibold">
                {collection.name}
              </h3>
              <p className="text-white/70 text-sm mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Explore &rarr;
              </p>
            </div>
          </div>
        </div>

        {/* Label below card */}
        <p className="uppercase tracking-[2px] text-xs font-semibold text-text-primary mt-3 text-center after:content-[''] after:block after:w-8 after:h-0.5 after:bg-accent after:mx-auto after:mt-2">
          {collection.name}
        </p>
      </Link>
    </ScrollReveal>
  );
}
