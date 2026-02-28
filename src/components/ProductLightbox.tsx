"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductLightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ProductLightbox({
  images,
  initialIndex,
  onClose,
}: ProductLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentZoom, setCurrentZoom] = useState(1);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setCurrentZoom(1);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setCurrentZoom(1);
  }, [images.length]);

  const zoomIn = useCallback(() => {
    setCurrentZoom((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setCurrentZoom((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setCurrentZoom(1);
  }, []);

  // Keyboard support
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "+":
        case "=":
          zoomIn();
          break;
        case "-":
          zoomOut();
          break;
        case "0":
          resetZoom();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goToPrev, goToNext, zoomIn, zoomOut, resetZoom]);

  // Body scroll lock
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
        onClick={(e) => {
          // Close when clicking backdrop (not the image)
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-8 right-8 w-12 h-12 rounded-full bg-black/50 text-white text-2xl hover:bg-black/80 z-[61] flex items-center justify-center transition-colors"
          aria-label="Close lightbox"
        >
          &times;
        </button>

        {/* Image counter */}
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1.5 rounded-full text-sm tracking-[2px]">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Previous arrow */}
        {images.length > 1 && (
          <button
            onClick={goToPrev}
            className="fixed left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white text-xl hover:bg-black/80 flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            &lsaquo;
          </button>
        )}

        {/* Next arrow */}
        {images.length > 1 && (
          <button
            onClick={goToNext}
            className="fixed right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white text-xl hover:bg-black/80 flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            &rsaquo;
          </button>
        )}

        {/* Image */}
        <div
          className="max-w-[90vw] max-h-[90vh] relative"
          style={{ transform: `scale(${currentZoom})`, transition: "transform 0.2s ease" }}
        >
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1} of ${images.length}`}
            width={1200}
            height={1600}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            priority
          />
        </div>

        {/* Zoom controls */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          <button
            onClick={zoomOut}
            className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-colors"
            aria-label="Zoom out"
          >
            &minus;
          </button>
          <button
            onClick={resetZoom}
            className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-colors"
            aria-label="Reset zoom"
          >
            &#x27F2;
          </button>
          <button
            onClick={zoomIn}
            className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-colors"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
