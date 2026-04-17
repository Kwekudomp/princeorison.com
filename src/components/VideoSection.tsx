"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const POSTER = "/images/hero/hero-3.jpeg";
const TITLE = "Detailed to Perfection";
const CAPTION =
  "From measurement to finish — every piece is a collaboration between artisan skill and your vision.";

export default function VideoSection() {
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

        {/* Cinematic poster */}
        <motion.div
          className="relative rounded-3xl overflow-hidden aspect-video bg-[#111]"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src={POSTER}
            alt={TITLE}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="cinematic-overlay absolute inset-0" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className="text-center px-6">
              <p className="font-display text-2xl md:text-4xl text-white font-light">
                {TITLE}
              </p>
              <p className="text-white/30 text-xs mt-3 tracking-[3px] uppercase">
                Video coming soon
              </p>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
            <p className="text-[10px] tracking-[4px] uppercase text-white/40">
              Prince Orison &mdash; Accra, Ghana
            </p>
          </div>
        </motion.div>

        {/* Caption row */}
        <motion.div
          className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-white/40 text-sm">{CAPTION}</p>
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
