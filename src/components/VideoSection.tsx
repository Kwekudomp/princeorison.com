"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Since no actual video file exists yet, this section shows a cinematic
// full-bleed image with a play button — ready to swap in a real video src.
const SHOWCASE_IMAGE = "/images/hero/hero-3.jpeg";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  return (
    <section className="dark-luxury py-20 px-[5%]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-8 h-px bg-accent" />
          <p className="text-[11px] tracking-[4px] uppercase text-accent font-semibold">
            Behind The Craft
          </p>
        </motion.div>

        {/* Cinematic container */}
        <motion.div
          className="relative rounded-3xl overflow-hidden aspect-video bg-[#111] cursor-pointer group"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onClick={handlePlay}
        >
          {/* Poster image — shown before play */}
          <AnimatePresence>
            {!playing && (
              <motion.div
                className="absolute inset-0 z-10"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={SHOWCASE_IMAGE}
                  alt="Prince Orison craftsmanship showcase"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="cinematic-overlay absolute inset-0" />

                {/* Overlay content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                  {/* Play button */}
                  <motion.button
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:bg-accent/80 group-hover:border-accent transition-all duration-400 cursor-pointer"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    aria-label="Play video"
                  >
                    {/* Triangle play icon */}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-8 h-8 text-white fill-white ml-1"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.button>

                  <div className="text-center">
                    <p className="font-display text-2xl md:text-4xl text-white font-light">
                      Detailed to Perfection
                    </p>
                    <p className="text-white/50 text-sm mt-2 tracking-wider">
                      Watch the process
                    </p>
                  </div>
                </div>

                {/* Corner branding */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                  <p className="text-[10px] tracking-[4px] uppercase text-white/40">
                    Prince Orison &mdash; Accra, Ghana
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actual video element — src to be provided when available */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls={playing}
            playsInline
            preload="none"
            poster={SHOWCASE_IMAGE}
            aria-label="Prince Orison fashion showcase video"
          >
            {/* Replace src with actual video URL when available */}
            {/* <source src="/videos/showcase.mp4" type="video/mp4" /> */}
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Caption row */}
        <motion.div
          className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-white/40 text-sm">
            From measurement to finish — every piece is a collaboration between
            artisan skill and your vision.
          </p>
          <a
            href="https://wa.me/233245099930?text=Hi%2C%20I'd%20like%20to%20book%20a%20consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[3px] uppercase text-accent hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            Book a Consultation &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
