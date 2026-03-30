# Prince Orison Fashion House — Content & Growth Plan

**Date:** 2026-03-29
**Status:** Planning

---

## Current State Audit

### What's working
- Light Crystal homepage is live with glassmorphism hero, FloatingMosaic, and collection grid
- 4 of 10 collections have product images and are fully presentable
- About page covers location, contact, and social links
- All WhatsApp CTA links are wired up correctly

### Critical gaps
| Gap | Impact |
|-----|--------|
| 6 collections have zero images | Cards render with no photo — looks unfinished |
| Raw assets not fully imported | trousers-shorts-1/2/3, shirts-casual-5/6, hero-showcase-2 sit unused in desktop folder |
| About page lacks founder narrative | No story, no face, no "why" — reduces trust |
| No social proof | No testimonials, no client photos, no press/features |
| No consultation/contact page | Only WhatsApp button — no structured enquiry flow |

---

## Phase 1 — Fix the Basics (do first)

### 1.1 Import raw assets
Copy from `C:/Users/kweku/Desktop/princeorison/` into the project:
- `trousers-shorts-1/2/3.jpeg` → `public/images/products/casual/`
- `shirts-casual-5/6.jpeg` → `public/images/products/kaftan-casual/`
- `hero-showcase-2.jpeg` → `public/images/hero/`

### 1.2 Populate Casual collection
Update `src/data/collections.ts` — add 3 products to the Casual collection using the trousers-shorts images. Name them accurately based on what's in the photos.

### 1.3 Extend Kaftan Casual
Add shirts-casual-5 and shirts-casual-6 as two new product entries in the Kaftan Casual collection.

### 1.4 Fallback treatment for image-less collections
Collections that are truly custom/bespoke (Political Suit, Ankara Blends, Kaftan Masterpiece, Jalabiya, Kaftan Jacket) should show a styled placeholder in `CollectionCard` — not a broken image. Options:
- Pattern/texture background with a "Bespoke — Enquire" badge
- A branded dark card with the collection name prominently displayed

---

## Phase 2 — About Page Expansion

The current about page is a stub. Expand it to build trust and brand identity.

### Sections to add:
1. **Founder Story** — Who is Prince Orison? Origin story, what drives the "Detailed to Perfection" philosophy
2. **The Craft** — Workshop/atelier photos, process description (measurement → cut → finish)
3. **Who We Dress** — Target client profile: entrepreneurs, executives, wedding parties, politicians
4. **Social Proof** — 3–6 client testimonials with photos if available; groomsmen group shots work well here
5. **Vision Statement** — Where is the brand going? (expansion, international, etc.)

---

## Phase 3 — Consultation & Conversion

### 3.1 Contact / Booking page (`/contact`)
Structured enquiry form collecting:
- Name, phone/WhatsApp number, email
- Collection of interest (dropdown from collections list)
- Event type (wedding, casual, formal, political)
- Event date (for time-sensitive orders)
- Message

On submit: send to princeorison1@gmail.com via Resend API + send WhatsApp notification.

### 3.2 Sticky WhatsApp button
Add a fixed floating WhatsApp button (bottom-right) across all pages for impulse enquiries.

### 3.3 Collection detail CTAs
Each `/collections/[slug]` product card should have a "Order via WhatsApp" and "Request Consultation" button — already partially in place, verify all products have correct `whatsappMessage` text.

---

## Phase 4 — SEO & Discovery

- Add `sitemap.xml` and `robots.txt`
- Add `og:image` meta tags using hero/product images per page
- Structured data (JSON-LD) for LocalBusiness with Accra address
- Alt text audit across all `<Image>` tags
- Add Google Business Profile link to About page

---

## Asset Gaps Still Needing Photography
These collections need real product photos before they can be fully launched:
- **Political Suit** — at least 1–2 suit photos
- **Ankara Blends** — 2–3 print pieces
- **Kaftan Masterpiece** — 2 statement pieces
- **Jalabiya (Custom)** — 1–2 finished pieces
- **Kaftan Jacket (3 Piece)** — 1–2 set photos

Until photography is available, use the Phase 1.4 styled placeholder approach.

---

## Quick Wins (can do today)
1. Copy raw assets into the project — 5 minutes
2. Update Casual collection data with trousers images — 15 minutes
3. Add FloatingMosaic to use hero-showcase-2 — 5 minutes
4. Add sticky WhatsApp button component — 20 minutes
