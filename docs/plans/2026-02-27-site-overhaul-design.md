# Prince Orison Fashion House — Site Overhaul Design

**Date:** 2026-02-27
**Status:** Approved
**Stack:** Next.js 15 (App Router) + Tailwind CSS 4 + Framer Motion + Vercel

---

## 1. Overview

Complete rebuild of princeorison.com from a static HTML site into a modern Next.js application. The overhaul expands from 4 product categories to 10, adopts a "Quiet Luxury Minimal" aesthetic, fixes all identified code issues, and brings the site to a globally competitive standard for premium African fashion.

### Key Decisions
- **Framework:** Next.js 15 App Router (from vanilla HTML)
- **Hosting:** Vercel (from GitHub Pages) — free tier, auto-deploy from GitHub
- **Aesthetic:** Quiet Luxury Minimal — warm whites, gold accents, elegant serif typography
- **Contact:** WhatsApp only (no contact form)
- **Hero:** Carousel (upgraded crossfade style, not basic slideshow)
- **Images:** Mix of existing photos + elegant placeholders for missing categories

---

## 2. Product Categories (10 total)

| # | Slug | Display Name | Notes |
|---|------|-------------|-------|
| 1 | `kaftan-casual` | KAFTAN (Casual) | Everyday kaftan wear |
| 2 | `political-suit` | POLITICAL SUIT | Formal political suiting |
| 3 | `ankara-blends` | ANKARA BLENDS | Ankara fusion pieces |
| 4 | `agbada-3-piece` | AGBADA (3 Piece) | Traditional 3-piece agbada sets |
| 5 | `rtw-collection` | RTW COLLECTION | Ready-to-wear, available in showroom |
| 6 | `casual` | CASUAL | Casual everyday wear |
| 7 | `groomsman-groomswear` | GROOMSMAN/GROOMSWEAR | Wedding/groomsmen collections |
| 8 | `kaftan-masterpiece` | KAFTAN (Masterpiece) | Premium statement kaftans |
| 9 | `jalabiya-custom` | JALABIYA (Custom) | Custom jalabiya designs |
| 10 | `kaftan-jacket-3-piece` | KAFTAN JACKET (3 Piece) | 3-piece sleeveless kaftan jacket |

---

## 3. Pages & Routes

```
/                           → Homepage
/collections                → All 10 categories grid
/collections/[slug]         → Individual category page
/about                      → Brand story, values, location
```

### Shared Layout
- **Nav:** Fixed, glassmorphism (backdrop-blur), logo left, links right, WhatsApp CTA pill button with gold accent
- **Footer:** Brand tagline "DETAILED TO PERFECTION", social links (IG, TikTok, WhatsApp), Accra address, copyright

---

## 4. Visual Design System

### Color Palette

```
--bg-primary:       #FFFBF7   (warm white)
--bg-surface:       #F5F1EB   (soft taupe for alternate sections)
--text-primary:     #1A1A1A   (deep charcoal)
--text-secondary:   #6B6B6B   (medium gray)
--accent:           #C9B06B   (warm gold — CTAs, hover states)
--accent-dark:      #8B7A3D   (dark gold for hover)
--dark-section:     #1A1A1A   (contrast sections like stats bar)
--border:           #E8E4DE   (subtle warm gray)
```

### Typography

- **Display/Headlines:** `Cormorant Garamond` — serif, weights 300/600, Google Fonts
- **Body/UI:** `Inter` — sans-serif, weights 400/500/600, Google Fonts
- **Labels:** `Inter` at 0.75rem, letter-spacing 3px, uppercase

### Spacing
- 8px base grid
- Section padding: 96px vertical desktop, 64px mobile
- Max content width: 1400px

---

## 5. Page Designs

### 5.1 Homepage

**Hero Section (100vh)**
- Split layout: text left (50%), carousel right (50%)
- Headline: "Where Craftsmanship Meets Elegance" in Cormorant Garamond, 4.5rem, weight 300
- Label above headline: "DETAILED TO PERFECTION" (uppercase Inter, gold text)
- Subtext: Brand description in Inter, 1.2rem, secondary text color
- CTAs: "Explore Collections" (solid gold) + "WhatsApp Us" (outlined)
- Right side: Premium crossfade carousel
  - 5-second auto-advance
  - Smooth opacity crossfade (1s transition)
  - Subtle dot indicators at bottom (gold active dot)
  - Pause on hover, touch swipe on mobile
  - No chunky arrow buttons
- Scroll indicator: subtle animated chevron at viewport bottom

**Stats Bar**
- Dark section (#1A1A1A), single row
- 4 stats: "10+ Years" | "500+ Happy Clients" | Ghana flag + "100% Made in Ghana" | "10 Premium Collections"
- No random image in stats (removing current anomaly)

**Featured Collections (6 of 10)**
- Section label: "OUR COLLECTIONS"
- Section title: "Curated for the Discerning Individual" (Cormorant Garamond)
- 3-column grid, 2 rows showing top 6 categories
- Aspect ratio 3:4 (portrait)
- On hover: image zooms 1.05x, dark gradient overlay, category name + "Explore" text
- Category name below in uppercase Inter with gold underline
- Staggered fade-in animation on scroll
- "View All Collections" link below grid

**Brand Story Section**
- Alternate background (--bg-surface)
- Split: text left, image right
- Content from current "About" section
- Values: Craftsmanship, Structure, Timelessness, Exclusivity (4 minimal cards)

**CTA Section**
- "Let's Create Something Exceptional"
- Two buttons: "WhatsApp Us" (gold) + "Visit Showroom" (outlined)

**Footer**

### 5.2 Collections Page (/collections)

- Hero banner: "Our Collections" + description
- Full 10-category grid (same card style as homepage)
- 3 columns desktop, 2 tablet, 1 mobile
- All categories shown

### 5.3 Category Page (/collections/[slug])

- Hero: Category name + description text
- Breadcrumb: Home > Collections > [Category Name]
- Product grid: 2 columns desktop, 1 mobile
- Product card:
  - 3:4 aspect ratio image (click opens lightbox)
  - Product name (Cormorant Garamond, 1.5rem)
  - Short description
  - Feature list (if available)
  - "Inquire via WhatsApp" button (pre-filled message with product name)
- For products without images: warm taupe placeholder with category name text
- Lightbox modal:
  - Full-screen overlay
  - Arrow navigation between product images
  - Zoom in/out controls
  - Image counter
  - Keyboard support (Escape, arrows, +/-)
  - Click outside to close

**CTA section at bottom:** "Ready to Order?" + WhatsApp + "View Other Collections"

### 5.4 About Page (/about)

- Full-width editorial banner image
- Brand story content (from current site)
- Values grid (4 cards)
- Location info with GPS
- Social links
- WhatsApp CTA

---

## 6. Component Architecture

```
src/
├── app/
│   ├── layout.tsx          (root layout with Nav + Footer)
│   ├── page.tsx            (homepage)
│   ├── about/
│   │   └── page.tsx
│   └── collections/
│       ├── page.tsx        (all collections grid)
│       └── [slug]/
│           └── page.tsx    (individual category)
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── HeroCarousel.tsx
│   ├── StatsBar.tsx
│   ├── CollectionCard.tsx
│   ├── ProductCard.tsx
│   ├── ProductLightbox.tsx
│   ├── BrandStory.tsx
│   ├── ValuesGrid.tsx
│   ├── CTASection.tsx
│   ├── ScrollReveal.tsx    (Framer Motion wrapper)
│   └── GhanaFlag.tsx
├── data/
│   └── collections.ts     (all 10 categories + products data)
├── lib/
│   └── utils.ts
└── public/
    └── images/
        ├── hero/
        ├── products/
        │   ├── kaftan-casual/
        │   ├── political-suit/
        │   ├── ankara-blends/
        │   ├── agbada-3-piece/
        │   ├── rtw-collection/
        │   ├── casual/
        │   ├── groomsman-groomswear/
        │   ├── kaftan-masterpiece/
        │   ├── jalabiya-custom/
        │   └── kaftan-jacket-3-piece/
        └── about/
```

---

## 7. Data Structure

```typescript
interface Collection {
  slug: string;
  name: string;
  description: string;
  heroDescription: string;
  coverImage: string;       // category cover for grid
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  images: string[];         // multiple angles
  whatsappMessage: string;  // pre-filled inquiry
}
```

All product data lives in `src/data/collections.ts` — no CMS or database needed.

---

## 8. Interactions & Animations

### Scroll Reveal
- Elements fade in + translate up 20px as they enter viewport
- 0.5s duration, staggered 50ms between grid items
- Uses Framer Motion `whileInView`

### Product Card Hover
- Image scale 1.05x (0.5s ease)
- Card shadow lifts (0 4px 20px rgba(0,0,0,0.08))
- Card translates up 4px

### Hero Carousel
- Opacity crossfade between slides (1s transition)
- Auto-advance every 5 seconds
- Gold dot indicators
- Touch swipe on mobile (Framer Motion gestures)

### Page Transitions
- Subtle fade between routes (Framer Motion AnimatePresence)

### Lightbox
- Backdrop fade in
- Image scale from 0.9 to 1.0
- Arrow key navigation
- Pinch-to-zoom on mobile

---

## 9. SEO & Performance

### Meta Tags (every page)
- `<title>` with page-specific content
- `<meta name="description">`
- Open Graph tags (og:title, og:description, og:image)
- Canonical URL
- Structured data (JSON-LD): LocalBusiness + Organization

### Performance
- `next/image` for automatic WebP, lazy loading, responsive srcset
- Fonts loaded via `next/font/google` (no layout shift)
- CSS purged via Tailwind (minimal bundle)
- Target: LCP < 2.5s, CLS < 0.1

### Favicon
- Custom favicon (gold "PO" monogram or brand mark)

---

## 10. Mobile Design

- Hamburger menu with slide-in drawer (consistent across all pages)
- Single-column layouts below 768px
- Touch-friendly buttons (min 44px height)
- Hero carousel: full-width image above text (stacked layout)
- Bottom-aligned WhatsApp sticky CTA on mobile product pages

---

## 11. Issues Fixed (from code review)

1. SSL cert — handled by Vercel (auto-provisions for custom domain)
2. Duplicate hero slide — fixed with new carousel data
3. Empty product descriptions — all categories get proper descriptions
4. Contact form → replaced with WhatsApp only
5. Empty feature icons → removed, replaced with values section
6. CSS/JS duplication → eliminated by component architecture
7. Font inconsistency → unified Cormorant Garamond + Inter
8. Color variable mismatch → unified design tokens in Tailwind config
9. No mobile menu on subpages → shared Nav component everywhere
10. hero-showcase.png (2.7MB) → next/image compression
11. No SEO meta tags → Next.js Metadata API on every page
12. No favicon → added
13. File names with spaces → reorganized into slug-based folders
14. Stats section image anomaly → removed, clean 4-stat layout
15. Logo not clickable on homepage → always an `<a>` link
