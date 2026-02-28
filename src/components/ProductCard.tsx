"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import ProductLightbox from "./ProductLightbox";
import { Product } from "@/data/collections";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const hasImages = product.images.length > 0;

  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="bg-white rounded-[20px] overflow-hidden border border-border-subtle group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
        {/* Image area */}
        <div
          className="cursor-pointer relative aspect-[3/4] overflow-hidden"
          onClick={() => {
            if (hasImages) {
              setLightboxIndex(0);
              setLightboxOpen(true);
            }
          }}
        >
          {hasImages ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-bg-surface flex items-center justify-center">
              <span className="text-text-secondary font-display text-xl">
                Coming Soon
              </span>
            </div>
          )}
        </div>

        {/* Info section */}
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold mb-2">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {product.description}
            </p>
          )}

          {product.features.length > 0 && (
            <ul className="space-y-2 mb-6">
              {product.features.map((feature, i) => (
                <li
                  key={i}
                  className="text-sm text-text-secondary py-2 border-b border-border-subtle last:border-b-0"
                >
                  &middot; {feature}
                </li>
              ))}
            </ul>
          )}

          <a
            href={`https://wa.me/233245099930?text=${encodeURIComponent(product.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-accent text-white text-center py-3.5 rounded-full font-medium tracking-wide text-sm hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Inquire via WhatsApp
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && hasImages && (
        <ProductLightbox
          images={product.images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </ScrollReveal>
  );
}
