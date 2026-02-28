# Light Crystal Homepage Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the Prince Orison homepage with a Light Crystal glassmorphism aesthetic, fix casual/groomswear data mismatch, and add a floating mosaic showcase section.

**Architecture:** Update CSS tokens for glass effects, move misplaced images, rewrite hero as full-viewport immersive section with integrated stats, build new FloatingMosaic component with auto-rotating images in frosted glass frames, and apply glass treatment to all existing sections.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, CSS backdrop-filter

---

### Task 1: Data Fix — Move Images & Update Collections

**Files:**
- Move: `public/images/products/casual/trousers-shorts-1.jpeg` → `public/images/products/groomswear/groomswear-1.jpeg`
- Move: `public/images/products/casual/trousers-shorts-2.jpeg` → `public/images/products/groomswear/groomswear-2.jpeg`
- Move: `public/images/products/casual/trousers-shorts-3.jpeg` → `public/images/products/groomswear/groomswear-3.jpeg`
- Modify: `src/data/collections.ts`

**Step 1: Create groomswear directory and move images**

```bash
mkdir -p public/images/products/groomswear
mv public/images/products/casual/trousers-shorts-1.jpeg public/images/products/groomswear/groomswear-1.jpeg
mv public/images/products/casual/trousers-shorts-2.jpeg public/images/products/groomswear/groomswear-2.jpeg
mv public/images/products/casual/trousers-shorts-3.jpeg public/images/products/groomswear/groomswear-3.jpeg
rmdir public/images/products/casual
```

**Step 2: Update the Groomsman/Groomswear collection in `src/data/collections.ts`**

Replace the entire groomsman-groomswear collection object (collection #7, starting around line 348) with:

```typescript
  {
    slug: "groomsman-groomswear",
    name: "GROOMSMAN/GROOMSWEAR",
    description: "Coordinated wedding and groomsmen collections",
    heroDescription:
      "Make your wedding day unforgettable with our coordinated groomsmen and groomswear collections. We work closely with you to design matching ensembles that complement the wedding theme while ensuring every member of the party looks impeccable.",
    coverImage: "/images/products/groomswear/groomswear-1.jpeg",
    products: [
      {
        id: "groomsman-groomswear-1",
        name: "Red Coordinated Set",
        description:
          "Vibrant red coordinated outfits for the entire wedding party, creating a bold and unified look.",
        features: [
          "Matching red coordinated outfits for groomsmen",
          "Tailored fit for each member of the party",
          "Premium fabric with comfortable construction",
          "Perfect for traditional wedding celebrations",
        ],
        images: ["/images/products/groomswear/groomswear-1.jpeg"],
        whatsappMessage: whatsappMsg("Red Coordinated Set"),
      },
      {
        id: "groomsman-groomswear-2",
        name: "Purple & Pink Groomsmen Set",
        description:
          "Elegant two-tone purple and pink coordinated outfits with matching agbada for the groom.",
        features: [
          "Two-tone purple and pink colour combination",
          "Coordinated outfits for groomsmen with groom's agbada",
          "Premium fabric with structured tailoring",
          "Ideal for formal traditional ceremonies",
        ],
        images: ["/images/products/groomswear/groomswear-2.jpeg"],
        whatsappMessage: whatsappMsg("Purple & Pink Groomsmen Set"),
      },
      {
        id: "groomsman-groomswear-3",
        name: "Orange Kente Wedding Set",
        description:
          "Coordinated orange outfits for groomsmen with a kente-draped groom ensemble celebrating Ghanaian heritage.",
        features: [
          "Matching orange coordinated groomsmen outfits",
          "Groom's outfit features traditional kente draping",
          "Celebrates Ghanaian wedding traditions",
          "Full wedding party coordination available",
        ],
        images: ["/images/products/groomswear/groomswear-3.jpeg"],
        whatsappMessage: whatsappMsg("Orange Kente Wedding Set"),
      },
    ],
  },
```

**Step 3: Update the Casual collection in `src/data/collections.ts`**

Replace the entire casual collection object (collection #6, starting around line 292) with:

```typescript
  {
    slug: "casual",
    name: "CASUAL",
    description: "Casual everyday wear for the modern professional",
    heroDescription:
      "Elevate your off-duty wardrobe with our casual collection. From perfectly tailored trousers to premium shorts, each piece is designed for the modern professional who values comfort without compromising on style.",
    coverImage: "",
    products: [
      {
        id: "casual-1",
        name: "Tailored Trousers",
        description:
          "Perfectly tailored trousers for the discerning professional who demands both style and comfort. Inquire for details.",
        features: [
          "Premium fabric with tailored fit",
          "Clean lines and refined finishing",
          "Inquire for available styles and sizing",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Tailored Trousers"),
      },
      {
        id: "casual-2",
        name: "Smart-Casual Shorts",
        description:
          "Premium casual shorts with a tailored fit, perfect for warm-weather sophistication. Inquire for details.",
        features: [
          "Tailored fit with structured waistband",
          "Breathable construction for warm weather",
          "Inquire for available colours and sizing",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Smart-Casual Shorts"),
      },
      {
        id: "casual-3",
        name: "Executive Polo Set",
        description:
          "Classic polo with matching trousers for a polished casual ensemble. Inquire for details.",
        features: [
          "Coordinated polo and trouser set",
          "Relaxed yet refined fit",
          "Inquire for fabric options and sizing",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Executive Polo Set"),
      },
    ],
  },
```

**Step 4: Verify build**

```bash
cd /c/Users/kweku/Desktop/princeorison.com && npx next build 2>&1 | tail -20
```

Expected: Build succeeds with no errors.

**Step 5: Commit**

```bash
git add public/images/products/groomswear/ src/data/collections.ts
git add -u public/images/products/casual/
git commit -m "fix: move wedding images from casual to groomswear collection

Casual section had traditional wedding photos misplaced as trousers/shorts.
Moved to groomswear with proper descriptions. Casual is now inquiry-based."
```

---

### Task 2: CSS Glass Tokens & Keyframes

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Update `globals.css` with glass tokens and animations**

Replace the entire file with:

```css
@import "tailwindcss";

@theme inline {
  /* Colors */
  --color-bg-primary: #FFFBF7;
  --color-bg-surface: #F5F1EB;
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #6B6B6B;
  --color-accent: #C9B06B;
  --color-accent-dark: #8B7A3D;
  --color-dark-section: #1A1A1A;
  --color-border-subtle: #E8E4DE;

  /* Glass tokens */
  --color-glass-white: rgba(255, 255, 255, 0.6);
  --color-glass-border: rgba(255, 255, 255, 0.3);
  --color-glass-glow: rgba(201, 176, 107, 0.15);

  /* Font families */
  --font-display: var(--font-cormorant), serif;
  --font-body: var(--font-inter), sans-serif;
}

html {
  scroll-behavior: smooth;
}

::selection {
  background-color: var(--color-accent);
  color: white;
}

body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-body);
}

/* Glass card utility */
.glass-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Glass frame for mosaic */
.glass-frame {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(201, 176, 107, 0.1), 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* Prismatic background effect */
.prismatic-bg {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(201, 176, 107, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(201, 176, 107, 0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(245, 241, 235, 0.8) 0%, transparent 60%),
    var(--color-bg-surface);
}

/* Light sweep animation for CTA */
@keyframes light-sweep {
  0% { transform: translateX(-100%) rotate(25deg); }
  100% { transform: translateX(200%) rotate(25deg); }
}

.light-sweep::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.15) 45%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0.15) 55%,
    transparent 100%
  );
  animation: light-sweep 4s ease-in-out infinite;
  pointer-events: none;
}

/* Floating animation keyframes */
@keyframes float-1 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.float-1 { animation: float-1 5s ease-in-out infinite; }
.float-2 { animation: float-2 6s ease-in-out infinite 0.5s; }
.float-3 { animation: float-3 7s ease-in-out infinite 1s; }

/* Hero overlay */
.hero-overlay {
  background: linear-gradient(
    180deg,
    rgba(255, 251, 247, 0.3) 0%,
    rgba(255, 251, 247, 0.5) 40%,
    rgba(255, 251, 247, 0.7) 100%
  );
}

/* Glass button */
.glass-btn {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 16px rgba(201, 176, 107, 0.15);
}

/* Glass pill for stats */
.glass-pill {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}
```

**Step 2: Verify build**

```bash
cd /c/Users/kweku/Desktop/princeorison.com && npx next build 2>&1 | tail -20
```

Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add Light Crystal glass tokens, keyframes, and utilities

Glass card, glass frame, prismatic background, floating animations,
hero overlay, glass buttons, glass pills, and light sweep effect."
```

---

### Task 3: HeroFullscreen Component

**Files:**
- Create: `src/components/HeroFullscreen.tsx`

**Step 1: Create the full-viewport hero component**

```typescript
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
```

**Step 2: Verify build**

```bash
cd /c/Users/kweku/Desktop/princeorison.com && npx next build 2>&1 | tail -20
```

Expected: Build succeeds (component not yet used in page).

**Step 3: Commit**

```bash
git add src/components/HeroFullscreen.tsx
git commit -m "feat: add HeroFullscreen component with glass pills stats bar

Full-viewport immersive hero with cycling background images, brand
signature watermark, frosted glass CTA buttons, and integrated stats."
```

---

### Task 4: FloatingMosaic Component

**Files:**
- Create: `src/components/FloatingMosaic.tsx`

**Step 1: Create the floating mosaic showcase component**

```typescript
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

interface MosaicFrame {
  images: string[];
  className: string; // positioning + sizing classes
  floatClass: string; // float-1, float-2, or float-3
  aspectRatio: string; // aspect ratio class
}

// All available product/hero images pooled together
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

// 7 frames with distributed images and varied sizes
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
    // Stagger the intervals so frames don't all change at once
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
        {/* Padding inside glass frame */}
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
      {/* Section header */}
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

      {/* Mosaic grid */}
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
```

**Step 2: Verify build**

```bash
cd /c/Users/kweku/Desktop/princeorison.com && npx next build 2>&1 | tail -20
```

Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/FloatingMosaic.tsx
git commit -m "feat: add FloatingMosaic showcase with auto-rotating glass frames

7 organic glass frames with staggered image cycling, floating animations,
hover scale effects, and mobile-responsive 2-column collapse."
```

---

### Task 5: Update CollectionCard with Glass Treatment

**Files:**
- Modify: `src/components/CollectionCard.tsx`

**Step 1: Replace the full contents of `CollectionCard.tsx`**

```typescript
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
```

**Step 2: Verify build**

```bash
cd /c/Users/kweku/Desktop/princeorison.com && npx next build 2>&1 | tail -20
```

Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/CollectionCard.tsx
git commit -m "style: apply glass treatment to CollectionCard

Frosted glass wrapper with gold glow hover, glass pattern gradient
for collections without cover images."
```

---

### Task 6: Update BrandStory with Glass Panel

**Files:**
- Modify: `src/components/BrandStory.tsx`

**Step 1: Replace the full contents of `BrandStory.tsx`**

```typescript
import Image from "next/image";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="prismatic-bg py-24 px-[5%]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left side — frosted glass text panel */}
        <div className="glass-card rounded-[20px] p-10 md:p-12">
          <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
            OUR STORY
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light mt-4 leading-tight">
            The Art of Refined African Fashion
          </h2>
          <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
            <p>
              Prince Orison Fashion House stands at the intersection of African
              heritage and contemporary design. We create fashion that honors
              tradition while embracing modernity, each piece meticulously
              crafted to elevate your presence.
            </p>
            <p>
              Our focus on structure, fit, and premium finishing sets us apart.
              From the boardroom to ceremonial occasions, Prince Orison designs
              are made for those who understand that true style is eternal.
            </p>
            <p>
              Located in Accra, Ghana, we serve entrepreneurs, professionals,
              creatives, and executive individuals who value craftsmanship and
              refuse to compromise on quality.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-block mt-6 text-accent font-medium hover:text-accent-dark transition"
          >
            Learn More &rarr;
          </Link>
        </div>

        {/* Right side — glass-framed image */}
        <div className="glass-frame rounded-[20px] p-2">
          <Image
            src="/images/about/workshop.jpeg"
            alt="Prince Orison workshop in Accra, Ghana"
            width={600}
            height={800}
            className="rounded-[16px] object-cover w-full"
          />
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build**

```bash
cd /c/Users/kweku/Desktop/princeorison.com && npx next build 2>&1 | tail -20
```

Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/BrandStory.tsx
git commit -m "style: apply glass panel treatment to BrandStory

Frosted glass text panel, glass-framed image, prismatic background."
```

---

### Task 7: Update ValuesGrid with Crystal Cards

**Files:**
- Modify: `src/components/ValuesGrid.tsx`

**Step 1: Replace the full contents of `ValuesGrid.tsx`**

```typescript
"use client";

import ScrollReveal from "./ScrollReveal";

const values = [
  {
    title: "Craftsmanship",
    description:
      "Every stitch tells a story of dedication and precision. Each piece is crafted with meticulous attention to detail.",
  },
  {
    title: "Structure",
    description:
      "Tailored to perfection for the modern silhouette. We prioritize fit and structure in every design.",
  },
  {
    title: "Timelessness",
    description:
      "Fashion that transcends seasonal trends. Our pieces remain elegant and relevant for years to come.",
  },
  {
    title: "Exclusivity",
    description:
      "Limited production, maximum impact. Quality over volume, always. Each piece feels exclusive and intentional.",
  },
];

export default function ValuesGrid() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, i) => (
          <ScrollReveal key={value.title} delay={i * 0.1}>
            <div className="glass-card p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(201,176,107,0.15)] hover:border-accent/20 group">
              {/* Gold diamond icon */}
              <div className="w-8 h-8 mb-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 text-accent drop-shadow-[0_0_6px_rgba(201,176,107,0.4)] group-hover:drop-shadow-[0_0_10px_rgba(201,176,107,0.6)] transition-all"
                >
                  <path
                    d="M12 2L22 12L12 22L2 12L12 2Z"
                    fill="currentColor"
                    fillOpacity="0.15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <h3 className="font-body text-lg font-medium mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Verify build**

```bash
cd /c/Users/kweku/Desktop/princeorison.com && npx next build 2>&1 | tail -20
```

Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/ValuesGrid.tsx
git commit -m "style: apply crystal card treatment to ValuesGrid

Glass cards with gold diamond icons, glow effect, hover lift animation."
```

---

### Task 8: Update CTASection with Glass Styling

**Files:**
- Modify: `src/components/CTASection.tsx`

**Step 1: Replace the full contents of `CTASection.tsx`**

```typescript
import Link from "next/link";

interface CTASectionProps {
  title: string;
  subtitle: string;
  variant?: "light" | "dark";
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export default function CTASection({
  title,
  subtitle,
  variant = "light",
  primaryHref = "https://wa.me/233245099930",
  primaryLabel = "WhatsApp Us",
  secondaryHref = "#",
  secondaryLabel = "Visit Showroom",
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`py-24 px-[5%] text-center relative overflow-hidden ${
        isDark ? "bg-dark-section text-white" : "prismatic-bg"
      }`}
    >
      {/* Light sweep overlay (light variant only) */}
      {!isDark && <div className="light-sweep absolute inset-0 pointer-events-none" />}

      <div className="max-w-2xl mx-auto relative z-10">
        <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
          READY TO ELEVATE YOUR STYLE?
        </p>
        <h2
          className={`font-display text-4xl md:text-5xl font-light mt-4 leading-tight ${
            isDark ? "text-white" : "text-text-primary"
          }`}
        >
          {title}
        </h2>
        <p
          className={`mt-6 text-lg leading-relaxed ${
            isDark ? "text-white/70" : "text-text-secondary"
          }`}
        >
          {subtitle}
        </p>

        <div className="flex gap-4 justify-center mt-10 flex-wrap">
          {/* Primary button — frosted glass gold */}
          {primaryHref.startsWith("http") || primaryHref.startsWith("https") ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent/90 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(201,176,107,0.3)] transition-all"
            >
              {primaryLabel}
            </a>
          ) : (
            <Link
              href={primaryHref}
              className="bg-accent/90 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(201,176,107,0.3)] transition-all"
            >
              {primaryLabel}
            </Link>
          )}

          {/* Secondary button — glass outline */}
          {secondaryHref.startsWith("http") ||
          secondaryHref.startsWith("https") ? (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-btn px-8 py-4 rounded-full font-medium tracking-wide ${
                isDark
                  ? "text-white border-white/30"
                  : "text-text-primary"
              }`}
            >
              {secondaryLabel}
            </a>
          ) : (
            <Link
              href={secondaryHref}
              className={`glass-btn px-8 py-4 rounded-full font-medium tracking-wide ${
                isDark
                  ? "text-white border-white/30"
                  : "text-text-primary"
              }`}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build**

```bash
cd /c/Users/kweku/Desktop/princeorison.com && npx next build 2>&1 | tail -20
```

Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/CTASection.tsx
git commit -m "style: apply glass treatment to CTASection

Frosted glass buttons, prismatic background, light sweep animation."
```

---

### Task 9: Rewire Homepage (page.tsx)

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Replace the full contents of `page.tsx`**

```typescript
import Link from "next/link";
import HeroFullscreen from "@/components/HeroFullscreen";
import FloatingMosaic from "@/components/FloatingMosaic";
import CollectionCard from "@/components/CollectionCard";
import BrandStory from "@/components/BrandStory";
import ValuesGrid from "@/components/ValuesGrid";
import CTASection from "@/components/CTASection";
import { collections } from "@/data/collections";

const heroImages = [
  { src: "/images/hero/hero-2.jpeg", alt: "Prince Orison fashion showcase" },
  { src: "/images/hero/hero-3.jpeg", alt: "Prince Orison fashion showcase" },
  { src: "/images/hero/hero-4.jpeg", alt: "Prince Orison fashion showcase" },
  { src: "/images/hero/hero-5.jpeg", alt: "Prince Orison fashion showcase" },
];

export default function Home() {
  return (
    <>
      {/* ── Section 1: Immersive Hero ──────────────────── */}
      <HeroFullscreen images={heroImages} />

      {/* ── Section 2: Floating Mosaic Showcase ────────── */}
      <FloatingMosaic />

      {/* ── Section 3: Featured Collections ────────────── */}
      <section className="py-24 px-[5%]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
            OUR COLLECTIONS
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light mt-4 leading-tight">
            Curated for the Discerning Individual
          </h2>
          <p className="text-text-secondary mt-6 text-lg">
            From structured agbadas to contemporary casual wear, each collection
            embodies our commitment to excellence.
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.slice(0, 6).map((col, i) => (
            <CollectionCard key={col.slug} collection={col} index={i} />
          ))}
        </div>

        <Link
          href="/collections"
          className="text-accent font-medium hover:text-accent-dark transition text-center block mt-12 text-lg"
        >
          View All Collections &rarr;
        </Link>
      </section>

      {/* ── Section 4: Brand Story ─────────────────────── */}
      <BrandStory />

      {/* ── Section 5: Values ──────────────────────────── */}
      <section className="py-24 px-[5%]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
            WHY CHOOSE US
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light mt-4 leading-tight">
            What Makes Us Different
          </h2>
          <p className="text-text-secondary mt-6 text-lg">
            We don&apos;t chase trends; we create timeless pieces that speak to
            quality, exclusivity, and intention.
          </p>
        </div>

        <ValuesGrid />
      </section>

      {/* ── Section 6: CTA ─────────────────────────────── */}
      <CTASection
        title="Let's Create Something Exceptional"
        subtitle="Schedule a consultation or visit our showroom in Accra to experience the Prince Orison difference."
        secondaryHref="/collections"
        secondaryLabel="Explore Collections"
      />
    </>
  );
}
```

**Step 2: Verify the full build**

```bash
cd /c/Users/kweku/Desktop/princeorison.com && npx next build 2>&1 | tail -30
```

Expected: Build succeeds with all pages rendering.

**Step 3: Visual check**

```bash
cd /c/Users/kweku/Desktop/princeorison.com && npx next dev &
```

Open `http://localhost:3000` and verify:
- Hero is full-viewport with cycling images and glass stats bar
- Mosaic section shows 7 frames with rotating images
- Collection cards have glass treatment
- Brand story has frosted panels
- Values have crystal cards with gold diamonds
- CTA has light sweep animation

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rewire homepage with Light Crystal redesign

Full-viewport hero, floating mosaic showcase, glass collection cards,
prismatic brand story, crystal values, and glass-styled CTA."
```

---

### Task 10: Cleanup Old Components

**Files:**
- Delete: `src/components/HeroCarousel.tsx` (replaced by HeroFullscreen)
- Delete: `src/components/StatsBar.tsx` (integrated into HeroFullscreen)

**Step 1: Remove old components**

```bash
rm src/components/HeroCarousel.tsx
rm src/components/StatsBar.tsx
```

**Step 2: Check no other files import them**

```bash
grep -r "HeroCarousel\|StatsBar" src/ --include="*.tsx" --include="*.ts"
```

Expected: No matches (page.tsx no longer imports them).

**Step 3: Verify build**

```bash
cd /c/Users/kweku/Desktop/princeorison.com && npx next build 2>&1 | tail -20
```

Expected: Build succeeds.

**Step 4: Commit**

```bash
git add -u src/components/HeroCarousel.tsx src/components/StatsBar.tsx
git commit -m "chore: remove HeroCarousel and StatsBar (replaced)

HeroCarousel replaced by HeroFullscreen, StatsBar integrated into hero."
```
