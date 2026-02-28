"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GhanaFlag from "./GhanaFlag";

interface HeroFullscreenProps {
  images: { src: string; alt: string }[];
}

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "100%", label: "Made in Ghana", flag: true },
  { value: "10", label: "Premium Collections" },
];

export default function HeroFullscreen({ images }: HeroFullscreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background cycling images */}
      {images.map((image, index) => (
        <div
          key={image.src}
          className="absolute inset-0"
          style={{
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Warm overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-[5%] max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="font-display text-lg md:text-xl text-text-secondary italic">
          Attire by
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-wide text-text-primary mt-2">
          PRINCE ORISON
        </h1>

        {/* Signature watermark */}
        <div className="relative w-48 md:w-64 h-12 md:h-16 mx-auto mt-4 opacity-60">
          <Image
            src="/images/hero/hero-6.jpeg"
            alt="Prince Orison signature"
            fill
            className="object-contain"
          />
        </div>

        <p className="text-xs md:text-sm tracking-[4px] uppercase text-text-secondary mt-4 font-medium">
          DETAILED TO PERFECTION
        </p>

        {/* Glass CTA buttons */}
        <div className="flex gap-4 mt-10 justify-center flex-wrap">
          <Link
            href="/collections"
            className="glass-btn px-8 py-4 rounded-full font-medium tracking-wide text-text-primary hover:-translate-y-0.5 transition-all"
          >
            Explore Collections
          </Link>
          <a
            href="https://wa.me/233245099930"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent/90 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-accent hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            WhatsApp Us
          </a>
        </div>
      </motion.div>

      {/* Glass pill stats bar at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-[900px] px-[5%]">
        <div className="glass-pill rounded-full px-6 py-4 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex items-center gap-2 text-center flex-1 min-w-[120px] justify-center ${
                i < stats.length - 1 ? "md:border-r md:border-border-subtle" : ""
              }`}
            >
              <span className="font-display text-xl md:text-2xl font-semibold text-text-primary">
                {stat.value}
              </span>
              <span className="text-xs text-text-secondary tracking-wide flex items-center gap-1">
                {stat.flag && <GhanaFlag />}
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
