"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GhanaFlag from "./GhanaFlag";

interface HeroFullscreenProps {
  images: { src: string; alt: string }[];
}

const SLIDE_DURATION = 6000;

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "100%", label: "Made in Ghana", flag: true },
  { value: "10", label: "Collections" },
];

const slideLabels = [
  { collection: "Casual Wear", desc: "Effortless everyday elegance" },
  { collection: "Agbada", desc: "Regal presence for life's milestones" },
  { collection: "Groomswear", desc: "Your wedding party, perfected" },
  { collection: "RTW Collection", desc: "Walk in. Walk out in style." },
];

export default function HeroFullscreen({ images }: HeroFullscreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgressKey((k) => k + 1);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
      setProgressKey((k) => k + 1);
    }, SLIDE_DURATION);
  }, [images.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setProgressKey((k) => k + 1);
  }, [images.length]);

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, SLIDE_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  const label = slideLabels[currentSlide] ?? slideLabels[0];

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#0d0d0d]">
      {/* Background cycling images */}
      {images.map((image, index) => (
        <div
          key={image.src}
          className="absolute inset-0"
          style={{
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 1.6s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover scale-[1.03]"
            style={{
              transformOrigin: index === currentSlide ? "center center" : "center center",
              transition: "transform 8s ease-out",
              transform: index === currentSlide ? "scale(1)" : "scale(1.03)",
            }}
            priority={index === 0}
          />
        </div>
      ))}

      {/* Editorial overlay — stronger on left, fades right */}
      <div className="absolute inset-0 hero-overlay-editorial" />
      {/* Bottom gradient for stats legibility */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/80 to-transparent" />

      {/* ── Main content — left-aligned editorial ── */}
      <div className="relative z-10 w-full px-[5%] pb-36 md:pb-40">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-xl"
            >
              <p className="text-[11px] tracking-[5px] uppercase text-accent font-semibold mb-4">
                {label.collection}
              </p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-light text-white leading-[0.95] tracking-tight">
                Prince<br />Orison
              </h1>
              <p className="font-display text-xl md:text-2xl text-white/60 italic mt-4 font-light">
                {label.desc}
              </p>

              <div className="flex gap-4 mt-10 flex-wrap">
                <Link
                  href="/collections"
                  className="bg-accent text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,176,107,0.35)] transition-all duration-300 cursor-pointer"
                >
                  Explore Collections
                </Link>
                <a
                  href="https://wa.me/233245099930"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/30 backdrop-blur-sm text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Slide indicators — bottom right ── */}
      <div className="absolute bottom-10 right-[5%] z-20 flex flex-col items-end gap-2">
        <p className="text-[10px] tracking-[3px] uppercase text-white/30 mb-1">
          {String(currentSlide + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </p>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-0.5 overflow-hidden rounded-full cursor-pointer transition-all duration-300"
            style={{ width: i === currentSlide ? 48 : 20, backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            {i === currentSlide && (
              <span
                key={progressKey}
                className="slide-progress absolute inset-y-0 left-0 bg-accent rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2">
        <div className="scroll-indicator">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 4v12M5 11l5 5 5-5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-[9px] tracking-[3px] uppercase text-white/25 rotate-90 mt-2">Scroll</p>
      </div>

      {/* ── Stats bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-[1400px] mx-auto px-[5%]">
          <div className="glass-pill rounded-t-2xl px-6 py-4 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap border-b-0">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-center gap-2 text-center flex-1 min-w-[110px] justify-center ${
                  i < stats.length - 1 ? "md:border-r md:border-black/10" : ""
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
      </div>
    </section>
  );
}
