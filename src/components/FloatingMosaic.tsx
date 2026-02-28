"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

interface MosaicFrame {
  images: string[];
  className: string;
  floatClass: string;
  aspectRatio: string;
}

const imagePool = [
  "/images/products/kaftan-casual/shirts-casual-1.jpeg",
  "/images/products/kaftan-casual/shirts-casual-2.jpeg",
  "/images/products/kaftan-casual/shirts-casual-3.jpeg",
  "/images/products/kaftan-casual/shirts-casual-4.jpeg",
  "/images/products/agbada-3-piece/kaftan-agbada-1.jpeg",
  "/images/products/agbada-3-piece/kaftan-agbada-2.jpeg",
  "/images/products/agbada-3-piece/kaftan-agbada-3.jpeg",
  "/images/products/groomswear/groomswear-1.jpeg",
  "/images/products/groomswear/groomswear-2.jpeg",
  "/images/products/groomswear/groomswear-3.jpeg",
  "/images/products/rtw-collection/womens-collection-1.jpeg",
  "/images/products/rtw-collection/womens-collection-2.jpeg",
  "/images/products/rtw-collection/womens-collection-3.jpeg",
  "/images/hero/hero-2.jpeg",
  "/images/hero/hero-3.jpeg",
  "/images/hero/hero-4.jpeg",
  "/images/hero/hero-5.jpeg",
];

const frames: MosaicFrame[] = [
  {
    images: [imagePool[0], imagePool[4], imagePool[10]],
    className: "col-span-1 row-span-1 md:col-start-1 md:row-start-1",
    floatClass: "float-1",
    aspectRatio: "aspect-[3/4]",
  },
  {
    images: [imagePool[13], imagePool[7], imagePool[2]],
    className: "col-span-1 row-span-1 md:col-start-2 md:row-start-1",
    floatClass: "float-2",
    aspectRatio: "aspect-square",
  },
  {
    images: [imagePool[5], imagePool[11], imagePool[14]],
    className: "col-span-1 row-span-1 md:col-start-3 md:row-start-1 md:col-span-2",
    floatClass: "float-3",
    aspectRatio: "aspect-[16/9]",
  },
  {
    images: [imagePool[8], imagePool[1], imagePool[15]],
    className: "col-span-1 row-span-1 md:col-start-1 md:row-start-2 md:col-span-2",
    floatClass: "float-2",
    aspectRatio: "aspect-[16/9]",
  },
  {
    images: [imagePool[6], imagePool[12], imagePool[3]],
    className: "col-span-1 row-span-1 md:col-start-3 md:row-start-2",
    floatClass: "float-1",
    aspectRatio: "aspect-[3/4]",
  },
  {
    images: [imagePool[9], imagePool[16], imagePool[0]],
    className: "col-span-1 row-span-1 md:col-start-4 md:row-start-2",
    floatClass: "float-3",
    aspectRatio: "aspect-square",
  },
  {
    images: [imagePool[3], imagePool[10], imagePool[14]],
    className: "col-span-1 row-span-1 md:col-start-2 md:row-start-3 md:col-span-2",
    floatClass: "float-1",
    aspectRatio: "aspect-[4/3]",
  },
];

function MosaicFrameCard({ frame, index }: { frame: MosaicFrame; index: number }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const cycleImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % frame.images.length);
  }, [frame.images.length]);

  useEffect(() => {
    const delay = 4000 + index * 700;
    const interval = setInterval(() => {
      if (!isHovered) cycleImage();
    }, delay);
    return () => clearInterval(interval);
  }, [cycleImage, index, isHovered]);

  return (
    <div
      className={`${frame.className} ${isHovered ? "" : frame.floatClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`glass-frame rounded-2xl overflow-hidden ${frame.aspectRatio} relative transition-all duration-300 ${
          isHovered ? "scale-105 shadow-2xl" : ""
        }`}
      >
        <div className="absolute inset-1.5 rounded-xl overflow-hidden">
          {frame.images.map((src, imgIndex) => (
            <div
              key={src}
              className="absolute inset-0"
              style={{
                opacity: imgIndex === currentImage ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
            >
              <Image
                src={src}
                alt="Prince Orison fashion"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FloatingMosaic() {
  return (
    <section className="py-24 px-[5%] overflow-hidden">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
            OUR CRAFT
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light mt-4 leading-tight">
            Every Piece Tells a Story
          </h2>
          <p className="text-text-secondary mt-6 text-lg">
            From the workshop to the occasion, experience the breadth of Prince Orison
            craftsmanship across every collection.
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {frames.map((frame, index) => (
          <ScrollReveal key={index} delay={index * 0.08}>
            <MosaicFrameCard frame={frame} index={index} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
