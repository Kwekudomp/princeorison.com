# Prince Orison Site Overhaul — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild princeorison.com as a Next.js 15 application with 10 product categories, quiet luxury aesthetic, and world-class performance.

**Architecture:** Next.js 15 App Router with shared layout (Nav + Footer), data-driven collection/product pages rendered from a TypeScript data file, Framer Motion for scroll animations and carousel, Tailwind CSS for styling with custom design tokens.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, Framer Motion 11, TypeScript, Vercel

**Design doc:** `docs/plans/2026-02-27-site-overhaul-design.md`

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

**Step 1: Initialize Next.js project**

Run from the repo root (`C:\Users\kweku\Desktop\princeorison.com`):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Select defaults when prompted. This will scaffold into the existing repo (the old HTML files will remain alongside).

**Step 2: Install additional dependencies**

```bash
npm install framer-motion
```

**Step 3: Configure Tailwind with design tokens**

Replace `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#FFFBF7",
          surface: "#F5F1EB",
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#6B6B6B",
        },
        accent: {
          DEFAULT: "#C9B06B",
          dark: "#8B7A3D",
        },
        dark: {
          section: "#1A1A1A",
        },
        border: {
          subtle: "#E8E4DE",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 4: Set up fonts and global styles**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #FFFBF7;
  --color-bg-surface: #F5F1EB;
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #6B6B6B;
  --color-accent: #C9B06B;
  --color-accent-dark: #8B7A3D;
  --color-dark-section: #1A1A1A;
  --color-border-subtle: #E8E4DE;

  --font-display: var(--font-cormorant), serif;
  --font-body: var(--font-inter), sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
}

::selection {
  background-color: var(--color-accent);
  color: white;
}
```

**Step 5: Set up root layout with fonts**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prince Orison Fashion House | Where Craftsmanship Meets Elegance",
    template: "%s | Prince Orison Fashion House",
  },
  description:
    "Creating refined, contemporary African fashion. Premium kaftans, agbadas, suits, and custom designs crafted in Accra, Ghana.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Prince Orison Fashion House",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

**Step 6: Create placeholder homepage**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-primary">
      <h1 className="font-display text-6xl font-light text-text-primary">
        Prince Orison
      </h1>
    </main>
  );
}
```

**Step 7: Verify dev server runs**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm "Prince Orison" renders in Cormorant Garamond on warm white background.

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project with Tailwind and design tokens"
```

---

## Task 2: Organize Image Assets

**Files:**
- Create: `public/images/hero/` directory with hero images
- Create: `public/images/products/` directories per category
- Create: `public/images/about/` directory

**Step 1: Create image directory structure**

```bash
mkdir -p public/images/hero
mkdir -p public/images/about
mkdir -p public/images/products/kaftan-casual
mkdir -p public/images/products/political-suit
mkdir -p public/images/products/ankara-blends
mkdir -p public/images/products/agbada-3-piece
mkdir -p public/images/products/rtw-collection
mkdir -p public/images/products/casual
mkdir -p public/images/products/groomsman-groomswear
mkdir -p public/images/products/kaftan-masterpiece
mkdir -p public/images/products/jalabiya-custom
mkdir -p public/images/products/kaftan-jacket-3-piece
```

**Step 2: Copy existing hero images**

```bash
cp assets/hero-2.jpeg public/images/hero/
cp assets/hero-3.jpeg public/images/hero/
cp assets/hero-4.jpeg public/images/hero/
cp assets/hero-5.jpeg public/images/hero/
cp assets/hero-6.jpeg public/images/hero/
cp assets/hero-showcase.jpeg public/images/hero/
```

**Step 3: Copy existing product images into new structure**

Map existing images to new category folders. The existing categories map as follows:
- `kaftan-agbada-*.jpeg` → `agbada-3-piece/`
- `shirts-casual-*.jpeg` → `kaftan-casual/` (closest match)
- `trousers-shorts-*.jpeg` → `casual/`
- `womens-collection-*.jpeg` → `rtw-collection/`

```bash
cp assets/products/kaftan-agbada-1.jpeg public/images/products/agbada-3-piece/
cp assets/products/kaftan-agbada-2.jpeg public/images/products/agbada-3-piece/
cp assets/products/kaftan-agbada-3.jpeg public/images/products/agbada-3-piece/
cp assets/products/shirts-casual-1.jpeg public/images/products/kaftan-casual/
cp assets/products/shirts-casual-2.jpeg public/images/products/kaftan-casual/
cp assets/products/shirts-casual-3.jpeg public/images/products/kaftan-casual/
cp assets/products/shirts-casual-4.jpeg public/images/products/kaftan-casual/
cp assets/products/trousers-shorts-1.jpeg public/images/products/casual/
cp assets/products/trousers-shorts-2.jpeg public/images/products/casual/
cp assets/products/trousers-shorts-3.jpeg public/images/products/casual/
cp assets/products/womens-collection-1.jpeg public/images/products/rtw-collection/
cp assets/products/womens-collection-2.jpeg public/images/products/rtw-collection/
cp assets/products/womens-collection-3.jpeg public/images/products/rtw-collection/
```

Note: Categories without photos (political-suit, ankara-blends, groomsman-groomswear, kaftan-masterpiece, jalabiya-custom, kaftan-jacket-3-piece) will use the placeholder treatment defined in the CollectionCard component.

**Step 4: Copy about image**

```bash
cp assets/hero-showcase.jpeg public/images/about/workshop.jpeg
```

**Step 5: Commit**

```bash
git add public/images/
git commit -m "feat: organize image assets into category-based structure"
```

---

## Task 3: Collections Data File

**Files:**
- Create: `src/data/collections.ts`

**Step 1: Create the data file**

Create `src/data/collections.ts` with complete TypeScript data for all 10 categories. Each collection has: slug, name, description, heroDescription, coverImage, and products array. Products have: id, name, description, features array, images array, and whatsappMessage.

- Include all existing products (migrated from old HTML files with their descriptions and features)
- For new categories without products yet, include 1-2 placeholder products with descriptive names and "Coming Soon" style descriptions
- WhatsApp messages should be pre-filled: `"Hi, I'm interested in the [Product Name]"`
- WhatsApp number: `233245099930`
- Cover images: use first product image if available, or empty string for placeholder treatment

Export the `collections` array and a `getCollectionBySlug(slug: string)` helper function.

Also export the TypeScript interfaces:

```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  images: string[];
  whatsappMessage: string;
}

export interface Collection {
  slug: string;
  name: string;
  description: string;
  heroDescription: string;
  coverImage: string;
  products: Product[];
}
```

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/data/collections.ts
git commit -m "feat: add collections data with all 10 categories and products"
```

---

## Task 4: Nav Component

**Files:**
- Create: `src/components/Nav.tsx`
- Modify: `src/app/layout.tsx` (add Nav to layout)

**Step 1: Build the Nav component**

Create `src/components/Nav.tsx` — a client component (`"use client"`) with:

- Fixed positioning, `backdrop-blur-lg`, warm white background with opacity
- Logo "PRINCE ORISON" as a Next.js `Link` to `/` — uppercase, letter-spacing 3px, Inter font, weight 600
- Desktop links: "Collections" → `/collections`, "About" → `/about`
- WhatsApp CTA pill button: gold background, white text, links to `https://wa.me/233245099930`
- Mobile hamburger menu (3 spans, animate to X on toggle)
- Mobile drawer: full-width slide-in panel from right with same links
- Scroll effect: on scroll > 50px, add subtle bottom border and reduced padding
- Use `useState` for mobile menu open/close
- Use `useEffect` with scroll listener for scroll effect
- Close mobile menu on route change (listen to `pathname` via `usePathname`)

**Step 2: Add Nav to root layout**

In `src/app/layout.tsx`, import and render `<Nav />` inside `<body>` before `{children}`.

**Step 3: Verify in browser**

```bash
npm run dev
```

Check: Nav renders fixed at top, logo links to home, hamburger appears on mobile viewport, scroll effect works.

**Step 4: Commit**

```bash
git add src/components/Nav.tsx src/app/layout.tsx
git commit -m "feat: add Nav component with mobile drawer and scroll effect"
```

---

## Task 5: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `src/components/GhanaFlag.tsx`
- Modify: `src/app/layout.tsx` (add Footer)

**Step 1: Build GhanaFlag component**

Create `src/components/GhanaFlag.tsx` — a small server component rendering the Ghana flag using CSS divs (3 stripes: red, gold with black star, green). Size: 48x32px.

**Step 2: Build Footer component**

Create `src/components/Footer.tsx` — server component with:

- Dark background (`bg-dark-section`), white text
- Three columns on desktop (stacks on mobile):
  1. Brand: "PRINCE ORISON" logo text + "Detailed to Perfection" tagline + GhanaFlag
  2. Quick Links: Collections, About, WhatsApp Us
  3. Contact: Address (Achimota ABC, Accra), GPS code, phone, email
- Social links row: Instagram, TikTok, WhatsApp — rendered as text abbreviations in circular bordered buttons (matching current design but upgraded)
- Copyright: `2026 PRINCE ORISON FASHION HOUSE`
- Subtle top border in gold accent

**Step 3: Add Footer to root layout**

In `src/app/layout.tsx`, import and render `<Footer />` after `{children}`.

**Step 4: Verify**

Check footer renders at page bottom, links work, responsive columns stack on mobile.

**Step 5: Commit**

```bash
git add src/components/Footer.tsx src/components/GhanaFlag.tsx src/app/layout.tsx
git commit -m "feat: add Footer and GhanaFlag components"
```

---

## Task 6: ScrollReveal Animation Wrapper

**Files:**
- Create: `src/components/ScrollReveal.tsx`

**Step 1: Create ScrollReveal component**

Create `src/components/ScrollReveal.tsx` — a client component (`"use client"`) using Framer Motion:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ScrollReveal.tsx
git commit -m "feat: add ScrollReveal animation wrapper component"
```

---

## Task 7: Hero Carousel (Homepage)

**Files:**
- Create: `src/components/HeroCarousel.tsx`

**Step 1: Build HeroCarousel component**

Create `src/components/HeroCarousel.tsx` — client component with:

- Props: `images: string[]` (array of image paths)
- State: `currentSlide` index
- Auto-advance every 5 seconds using `useEffect` with `setInterval`
- Pause on hover (`onMouseEnter`/`onMouseLeave`)
- Crossfade transition: all images stacked absolutely, active one has `opacity: 1`, others `opacity: 0`, CSS `transition: opacity 1s ease-in-out`
- Gold dot indicators at bottom (small circles, active one filled gold, others outlined)
- Click dot to go to that slide
- Touch swipe support using Framer Motion `drag="x"` gesture on the container
- Uses `next/image` for all images with `fill`, `object-cover`, `priority` on first image
- Rounded corners (20px border radius)
- Subtle shadow on the carousel container
- Fixed aspect ratio container: 600px height on desktop, 400px on mobile

**Step 2: Verify**

Add temporarily to homepage to test. Check: images crossfade, dots work, auto-advance works, pause on hover works.

**Step 3: Commit**

```bash
git add src/components/HeroCarousel.tsx
git commit -m "feat: add premium crossfade HeroCarousel component"
```

---

## Task 8: Homepage — Full Build

**Files:**
- Create: `src/components/StatsBar.tsx`
- Create: `src/components/CollectionCard.tsx`
- Create: `src/components/BrandStory.tsx`
- Create: `src/components/ValuesGrid.tsx`
- Create: `src/components/CTASection.tsx`
- Modify: `src/app/page.tsx` (compose full homepage)

**Step 1: Build StatsBar component**

Server component. Dark background section with 4 stats in a row:
- "10+" / "Years Experience"
- "500+" / "Happy Clients"
- GhanaFlag + "100%" / "Made in Ghana"
- "10" / "Premium Collections"

Numbers in Cormorant Garamond (3rem, weight 300), labels in Inter (0.9rem, uppercase, letter-spacing). Responsive: wraps to 2x2 grid on mobile.

**Step 2: Build CollectionCard component**

Client component. Props: `collection: Collection`, `index: number` (for stagger delay).

- Aspect ratio 3:4 container with overflow hidden and rounded corners (20px)
- If `coverImage` exists: render `next/image` with `fill` and `object-cover`
- If no `coverImage`: render warm taupe placeholder (`bg-bg-surface`) with category name centered
- Overlay: gradient from transparent to black at bottom, contains category name + "Explore" text
- Hover: image scales 1.05x (0.5s transition), overlay becomes more visible
- Wrapped in Next.js `Link` to `/collections/[slug]`
- Wrapped in `ScrollReveal` with staggered delay based on `index`

**Step 3: Build BrandStory component**

Server component. Alternate background section with:
- Split layout: text left (60%), image right (40%)
- Section label "OUR STORY" in gold
- Title "The Art of Refined African Fashion" in Cormorant Garamond
- 2-3 paragraphs from existing about content
- Image: editorial/workshop photo using `next/image`
- Responsive: stacks on mobile

**Step 4: Build ValuesGrid component**

Server component. 4 cards in a row:
- Craftsmanship: "Every stitch tells a story of dedication"
- Structure: "Tailored to perfection for the modern silhouette"
- Timelessness: "Designs that transcend seasonal trends"
- Exclusivity: "Limited pieces, maximum impact"

Cards: subtle border, rounded corners, title in Inter 500, description in text-secondary. Responsive: 2x2 on tablet, 1 column on mobile. Each wrapped in ScrollReveal.

**Step 5: Build CTASection component**

Server component. Props: `title`, `subtitle`, optional `variant` ("light" | "dark").
- Centers content, renders title in Cormorant Garamond, subtitle in Inter
- Two buttons: "WhatsApp Us" (gold solid) + secondary button (outlined)
- Gold background variant for main CTA, dark variant for category page CTAs

**Step 6: Compose the homepage**

In `src/app/page.tsx`, build the full page:

```
Hero section (split: text left + HeroCarousel right)
  - Label: "DETAILED TO PERFECTION" (gold, uppercase)
  - H1: "Where Craftsmanship\nMeets Elegance" (Cormorant, 4.5rem)
  - Tagline paragraph
  - Two CTA buttons
  - Scroll chevron at bottom (animated bounce)
StatsBar
Featured Collections section (first 6 from data, in CollectionCard grid)
  - Section header with label + title
  - 3-column grid
  - "View All Collections" link
BrandStory
ValuesGrid
CTASection ("Let's Create Something Exceptional")
```

Import collections data from `src/data/collections.ts`, slice first 6 for featured grid.

**Step 7: Verify homepage**

```bash
npm run dev
```

Check every section renders: hero with carousel, stats, 6 collection cards, brand story, values, CTA, footer. Check mobile responsive layout. Check scroll animations fire.

**Step 8: Commit**

```bash
git add src/components/ src/app/page.tsx
git commit -m "feat: build complete homepage with all sections"
```

---

## Task 9: Collections Index Page

**Files:**
- Create: `src/app/collections/page.tsx`

**Step 1: Build the collections page**

Create `src/app/collections/page.tsx`:

- Export metadata: title "Our Collections", description about browsing all categories
- Hero banner section with "Our Collections" title + description
- Full 10-category grid using `CollectionCard` component
- 3 columns desktop, 2 tablet, 1 mobile
- All 10 collections from data file
- Staggered scroll reveal on each card

**Step 2: Verify**

Navigate to `/collections`. All 10 categories should render. Cards with images show photos, cards without show warm taupe placeholder.

**Step 3: Commit**

```bash
git add src/app/collections/page.tsx
git commit -m "feat: add collections index page with all 10 categories"
```

---

## Task 10: Product Lightbox Component

**Files:**
- Create: `src/components/ProductLightbox.tsx`

**Step 1: Build ProductLightbox**

Client component. Props: `images: string[]`, `initialIndex: number`, `onClose: () => void`.

Features:
- Full-screen fixed overlay with dark backdrop (rgba(0,0,0,0.95))
- Centered image using `next/image`
- Arrow navigation: prev/next buttons (left/right positioned)
- Image counter: "1 / 3" at top center
- Close button: X at top right
- Keyboard support: Escape to close, ArrowLeft/ArrowRight to navigate, +/- for zoom
- Click outside image to close
- Zoom controls: zoom in (+0.25), zoom out (-0.25), reset (buttons at bottom center)
- Current zoom level tracked in state, applied via CSS transform scale
- Framer Motion: backdrop fades in, image scales from 0.9→1.0 on open
- Body scroll locked when open (`document.body.style.overflow = "hidden"`)
- Touch swipe for mobile using Framer Motion drag gesture

**Step 2: Commit**

```bash
git add src/components/ProductLightbox.tsx
git commit -m "feat: add ProductLightbox with zoom, keyboard nav, and swipe"
```

---

## Task 11: Product Card Component

**Files:**
- Create: `src/components/ProductCard.tsx`

**Step 1: Build ProductCard**

Client component. Props: `product: Product`, `index: number`.

- State: `lightboxOpen` boolean, `lightboxIndex` number
- Card layout: image on top (3:4 aspect ratio), info below
- Image area: clickable, shows first product image or warm taupe placeholder
- Hover: image scales 1.05x, card shadow lifts, card translates up 4px
- Info section:
  - Product name in Cormorant Garamond (1.3rem, weight 600)
  - Description in Inter (text-secondary, 0.95rem)
  - Features list: bulleted, Inter 0.85rem, with subtle border-bottom between items
  - "Inquire via WhatsApp" button: gold background, full width, links to `https://wa.me/233245099930?text=[encodedMessage]`
- Clicking image opens ProductLightbox with that product's images
- Wrapped in ScrollReveal with index-based delay

**Step 2: Commit**

```bash
git add src/components/ProductCard.tsx
git commit -m "feat: add ProductCard with lightbox integration"
```

---

## Task 12: Individual Category Page (Dynamic Route)

**Files:**
- Create: `src/app/collections/[slug]/page.tsx`

**Step 1: Build the dynamic category page**

Create `src/app/collections/[slug]/page.tsx`:

- `generateStaticParams()`: return all 10 slugs from collections data for static generation
- `generateMetadata()`: dynamic title and description per collection
- Page layout:
  - Breadcrumb: Home > Collections > [Category Name] (with links)
  - Hero banner: category name (Cormorant Garamond, 3.5rem) + heroDescription
  - Product grid: 2 columns desktop, 1 mobile, using ProductCard component
  - If collection has no products: show elegant "Coming Soon" message
  - CTASection at bottom: "Ready to Order?" + WhatsApp + link to /collections
- If slug doesn't match any collection: call `notFound()` from next/navigation

**Step 2: Verify**

Navigate to `/collections/agbada-3-piece`. Should show 3 products with images. Navigate to `/collections/political-suit`. Should show placeholder products. Check breadcrumbs link correctly.

**Step 3: Commit**

```bash
git add src/app/collections/\[slug\]/page.tsx
git commit -m "feat: add dynamic category pages with product grids"
```

---

## Task 13: About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Build the about page**

Create `src/app/about/page.tsx`:

- Export metadata: title "About", description about Prince Orison story
- Full-width hero banner image (workshop/atelier photo)
- Brand story section (same content as homepage but expanded):
  - "The Art of Refined African Fashion" title
  - 3 paragraphs about brand heritage, approach, and clientele
- Values grid (reuse ValuesGrid component)
- Location section:
  - "Visit Us" with address: Achimota ABC, Accra, Ghana, GPS: GE-370-8751
  - "Find us on Maps / Uber / Bolt / Yango"
  - Contact: email + phone links
  - Social links: Instagram, TikTok, WhatsApp
- CTASection: "Let's Create Something Exceptional"

**Step 2: Verify**

Navigate to `/about`. All sections render. Links work.

**Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add About page with brand story and location info"
```

---

## Task 14: SEO & Metadata

**Files:**
- Create: `src/app/favicon.ico` (or `public/favicon.svg`)
- Modify: `src/app/layout.tsx` (add structured data)

**Step 1: Create favicon**

Create a simple SVG favicon (`public/favicon.svg`) — gold "PO" monogram on transparent background. Add to layout metadata:

```tsx
icons: {
  icon: "/favicon.svg",
},
```

**Step 2: Add JSON-LD structured data**

In `src/app/layout.tsx`, add a `<script type="application/ld+json">` in the body with LocalBusiness schema:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Prince Orison Fashion House",
  "description": "Creating refined, contemporary African fashion",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Achimota ABC",
    "addressLocality": "Accra",
    "addressCountry": "GH"
  },
  "telephone": "+233245099930",
  "email": "princeorison1@gmail.com",
  "url": "https://www.princeorison.com",
  "sameAs": [
    "https://instagram.com/princeorison",
    "https://tiktok.com/@princeorison"
  ]
}
```

**Step 3: Verify**

Run build to check for metadata errors:

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 4: Commit**

```bash
git add public/favicon.svg src/app/layout.tsx
git commit -m "feat: add favicon and JSON-LD structured data"
```

---

## Task 15: Final Build Verification & Cleanup

**Files:**
- Modify: `.gitignore` (ensure node_modules, .next excluded)

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds. Check output for any warnings about missing images or broken links.

**Step 2: Run production server locally**

```bash
npm start
```

Test every page:
- `/` — homepage hero, carousel, stats, collections grid, brand story, values, CTA
- `/collections` — all 10 categories render
- `/collections/agbada-3-piece` — products with images show correctly
- `/collections/political-suit` — placeholder treatment works
- `/about` — brand story, location, social links
- Mobile: test hamburger menu, responsive layouts, touch carousel

**Step 3: Verify all 15 original issues are fixed**

1. SSL — will be auto-provisioned by Vercel on deploy
2. Duplicate hero slide — new carousel data has unique images
3. Empty descriptions — all products have descriptions
4. Contact form — replaced with WhatsApp
5. Empty feature icons — replaced with ValuesGrid
6. CSS/JS duplication — eliminated by components
7. Font inconsistency — unified fonts via next/font
8. Color mismatch — unified via Tailwind config
9. Mobile menu on all pages — shared Nav
10. Large images — next/image optimization
11. SEO meta — Metadata API on every page
12. Favicon — added
13. File names with spaces — slug-based folders
14. Stats anomaly — clean 4-stat layout
15. Logo clickable — always a Link

**Step 4: Clean up old files (optional — do last)**

The old HTML files (`index.html`, `kaftan-agbada.html`, etc.) and `assets/` folder can be removed since the Next.js app replaces them. But confirm with user before deleting.

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete Prince Orison site overhaul — Next.js rebuild"
```

---

## Task 16: Deploy to Vercel

**Step 1: Install Vercel CLI (if not installed)**

```bash
npm i -g vercel
```

**Step 2: Deploy**

```bash
vercel
```

Follow prompts — link to GitHub repo, select defaults. Vercel will build and deploy.

**Step 3: Configure custom domain**

In Vercel dashboard:
1. Go to project Settings > Domains
2. Add `princeorison.com` and `www.princeorison.com`
3. Update DNS records at domain registrar to point to Vercel
4. Vercel auto-provisions SSL for both domains (fixes the cert issue)

**Step 4: Verify live site**

Check `https://www.princeorison.com` and `https://princeorison.com` both work with valid SSL.

**Step 5: Commit any deploy config**

```bash
git add -A
git commit -m "chore: add Vercel deployment configuration"
```
