# Light Crystal Homepage Redesign — Design Document

**Date:** 2026-02-28
**Status:** Approved

## Problem

1. The **Casual** collection (`casual/`) contains 3 images showing traditional wedding/groomswear (coordinated red, purple, orange outfits at wedding ceremonies). These belong in the **Groomsman/Groomswear** collection which currently has no images.
2. The homepage lacks a luxury bespoke feel — standard carousel + 3-column grid doesn't differentiate Prince Orison as a premium fashion house.
3. No dynamic image showcase section to highlight the brand's photography.

## Solution

Full homepage redesign using a **Light Crystal** aesthetic: warm off-white base with frosted glass panels, soft light refractions, crystalline borders, and a new **Floating Mosaic** image showcase with auto-rotating images.

## Aesthetic Direction: Light Crystal

- Keep warm `#FFFBF7` base and `#C9B06B` gold accent
- Add glassmorphism: `backdrop-blur(20px)`, translucent white panels, glass borders
- Soft prismatic light effects via CSS gradients
- Frosted glass treatment on cards, buttons, and panels

### New CSS Tokens

```
glass-white:   rgba(255, 255, 255, 0.6)   — frosted panel fill
glass-border:  rgba(255, 255, 255, 0.3)   — glass card borders
glass-glow:    rgba(201, 176, 107, 0.15)  — soft gold glow
glass-blur:    20px                        — backdrop-blur amount
```

## Data Fixes

### Groomswear Collection
- Move `casual/trousers-shorts-1.jpeg` → `groomswear/groomswear-1.jpeg`
- Move `casual/trousers-shorts-2.jpeg` → `groomswear/groomswear-2.jpeg`
- Move `casual/trousers-shorts-3.jpeg` → `groomswear/groomswear-3.jpeg`
- Add 3 products with images:
  - Red Coordinated Set (groomswear-1)
  - Purple & Pink Groomsmen Set (groomswear-2)
  - Orange Kente Wedding Set (groomswear-3)
- Set coverImage to `groomswear-1.jpeg`

### Casual Collection
- Set `images: []` on all products (inquiry-based)
- Set `coverImage: ""`
- Update products to: Tailored Trousers, Smart-Casual Shorts, Executive Polo Set

## Homepage Sections (in order)

### 1. Hero — Full Viewport Immersive

- Full-width background images cycling with crossfade (6s interval)
- Brand signature from `hero-6.jpeg` as subtle watermark/centerpiece
- Warm semi-transparent overlay for readability (not dark)
- Frosted glass CTA buttons (`backdrop-blur` + `glass-border`)
- Stats bar integrated into hero bottom as frosted glass pills
- Content fades up slightly on scroll (parallax feel)
- Text: "Attire by" / "PRINCE ORISON" / signature / "DETAILED TO PERFECTION"

### 2. Floating Mosaic Showcase (NEW)

- 7 frosted-glass frames scattered in organic layout (CSS grid with manual positioning)
- Frame styling: `backdrop-blur(20px)`, `glass-border`, soft `glass-glow`, rounded corners
- Image pool: All product images (~17 images) distributed across 7 frames
- Each frame cycles through 2-3 images with crossfade every 4-5 seconds (staggered)
- Subtle floating animation: each frame bobs up/down 5-8px on different sine-wave timings
- On hover: frame scales to 1.05, shadow intensifies, floating pauses
- Mobile: collapses to 2-column grid, floating disabled, image swap kept
- Frame sizes vary: 2 large (16:9), 2 medium (3:4), 2 small (1:1), 1 medium-wide (4:3)
- Section header: "Our Craft" / "Every Piece Tells a Story"

### 3. Featured Collections — Frosted Glass Cards

- Same 3-column grid (first 6 collections)
- Cards get: `backdrop-blur`, `glass-white` fill, `glass-border`
- Image cards retain gradient overlay
- No-image cards get subtle glass pattern fill instead of plain `bg-surface`
- Gold accent underline on hover (keep existing behavior)
- Soft `glass-glow` on hover

### 4. Brand Story — Glass Panel Layout

- Text panel gets subtle frosted glass background
- Image frame gets same glass treatment as showcase frames
- Prismatic light effect in section background (CSS gradient)

### 5. Values — Crystal Cards

- Each card: `backdrop-blur`, `glass-white` fill, `glass-border`
- Gold diamond icon with subtle glow
- On hover: border brightens, card lifts with enhanced shadow

### 6. CTA — Glass-Styled

- Warm gradient background with soft light rays
- Gold CTA button gets frosted glass treatment (translucent, not solid)
- Subtle animated light sweep across section background

## Files Changed

| File | Action |
|------|--------|
| `globals.css` | Add glass tokens, prismatic gradient, light-sweep keyframes |
| `page.tsx` | Restructure hero, add showcase, reorder sections |
| `HeroCarousel.tsx` → `HeroFullscreen.tsx` | Full-viewport cycling background |
| `StatsBar.tsx` | Integrated into hero as frosted glass pills |
| `FloatingMosaic.tsx` | **New** component |
| `CollectionCard.tsx` | Glass treatment |
| `BrandStory.tsx` | Glass panel + prismatic background |
| `ValuesGrid.tsx` | Crystal card treatment |
| `CTASection.tsx` | Glass buttons + light sweep |
| `collections.ts` | Data fixes |
| `public/images/products/groomswear/` | **New folder** with moved images |

## Technical Notes

- All glass effects use `backdrop-filter: blur(20px)` with CSS fallback
- Floating animations via Framer Motion (already a dependency)
- Image cycling in Mosaic uses `useState` + `setInterval` with staggered timers
- Mobile: Mosaic collapses to 2-col grid, floating disabled, image swap kept
- No new dependencies needed
