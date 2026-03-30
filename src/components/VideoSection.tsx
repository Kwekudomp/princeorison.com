"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { VideoRow } from "@/lib/database.types";
import { getVideoUrl, getImageUrl } from "@/lib/collections.service";

const FALLBACK_POSTER = "/images/hero/hero-3.jpeg";

interface VideoSectionProps {
  video?: VideoRow | null;
}

export default function VideoSection({ video }: VideoSectionProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = video ? getVideoUrl(video.storage_path) : null;
  const poster = video?.thumbnail_path
    ? getImageUrl(video.thumbnail_path)
    : FALLBACK_POSTER;
  const title = video?.title ?? "Detailed to Perfection";
  const caption =
    video?.caption ??
    "From measurement to finish — every piece is a collaboration between artisan skill and your vision.";
  const sectionLabel = video?.category === "behind-the-scenes"
    ? "Behind The Craft"
    : video?.category === "lookbook"
    ? "Lookbook"
    : video?.category === "reel"
    ? "Latest Reel"
    : "Behind The Craft";

  const handlePlay = () => {
    if (!videoSrc) return; // no video uploaded yet — do nothing
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 100);
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
            {sectionLabel}
          </p>
        </motion.div>

        {/* Cinematic container */}
        <motion.div
          className={`relative rounded-3xl overflow-hidden aspect-video bg-[#111] group ${videoSrc ? "cursor-pointer" : "cursor-default"}`}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onClick={handlePlay}
        >
          {/* Poster — shown before play */}
          <AnimatePresence>
            {!playing && (
              <motion.div
                className="absolute inset-0 z-10"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={poster}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="cinematic-overlay absolute inset-0" />

                {/* Overlay content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                  {/* Play button — only shown when a video is available */}
                  {videoSrc && (
                    <motion.button
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:bg-accent/80 group-hover:border-accent transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label="Play video"
                    >
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white ml-1" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.button>
                  )}

                  <div className="text-center px-6">
                    <p className="font-display text-2xl md:text-4xl text-white font-light">
                      {title}
                    </p>
                    {videoSrc ? (
                      <p className="text-white/50 text-sm mt-2 tracking-wider">Watch the process</p>
                    ) : (
                      <p className="text-white/30 text-xs mt-3 tracking-[3px] uppercase">
                        Video coming soon
                      </p>
                    )}
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

          {/* Video element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls={playing}
            playsInline
            preload="none"
            poster={poster}
            aria-label="Prince Orison fashion showcase video"
          >
            {videoSrc && <source src={videoSrc} type="video/mp4" />}
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
          <p className="text-white/40 text-sm">{caption}</p>
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
