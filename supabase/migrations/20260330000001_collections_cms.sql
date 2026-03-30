-- ============================================================
-- Migration 001: Collections CMS
-- Prince Orison Fashion House
-- ============================================================
-- Tables: collections, products, product_images

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── collections ──────────────────────────────────────────────
CREATE TABLE collections (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug          TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  description   TEXT,
  hero_description TEXT,
  cover_image   TEXT,                        -- storage path or URL
  display_order INTEGER NOT NULL DEFAULT 0,  -- controls homepage order
  is_published  BOOLEAN NOT NULL DEFAULT true,
  is_bespoke    BOOLEAN NOT NULL DEFAULT false, -- bespoke/enquire-only
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE collections IS 'Top-level fashion categories (kaftan, agbada, groomswear, etc.)';
COMMENT ON COLUMN collections.is_bespoke IS 'True for made-to-order collections with no product images';

-- ── products ─────────────────────────────────────────────────
CREATE TABLE products (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collection_id     UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  name              TEXT NOT NULL,
  description       TEXT,
  whatsapp_message  TEXT,                    -- pre-filled WhatsApp text
  display_order     INTEGER NOT NULL DEFAULT 0,
  is_published      BOOLEAN NOT NULL DEFAULT true,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE products IS 'Individual garment listings within a collection';

-- ── product_features ─────────────────────────────────────────
CREATE TABLE product_features (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  feature     TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

COMMENT ON TABLE product_features IS 'Bullet-point feature list for each product';

-- ── product_images ────────────────────────────────────────────
CREATE TABLE product_images (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,               -- path in Supabase Storage bucket
  alt_text    TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_cover    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE product_images IS 'Images for a product stored in Supabase Storage';

-- ── Indexes ───────────────────────────────────────────────────
CREATE INDEX idx_collections_slug        ON collections(slug);
CREATE INDEX idx_collections_published   ON collections(is_published, display_order);
CREATE INDEX idx_products_collection     ON products(collection_id, display_order);
CREATE INDEX idx_product_images_product  ON product_images(product_id, sort_order);

-- ── updated_at auto-trigger ───────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Seed: collections from current static data ────────────────
INSERT INTO collections (slug, name, description, hero_description, cover_image, display_order, is_bespoke) VALUES
  ('kaftan-casual',         'KAFTAN (Casual)',        'Everyday kaftan wear with modern styling',
   'Discover our range of casual kaftans designed for the modern man. Each piece combines traditional silhouettes with contemporary tailoring, delivering effortless style for everyday occasions.',
   'images/products/kaftan-casual/shirts-casual-1.jpeg', 1, false),

  ('agbada-3-piece',        'AGBADA (3 Piece)',       'Structured 3-piece sets combining traditional elegance with modern tailoring',
   'Make a grand entrance with our meticulously crafted agbada three-piece sets. Each ensemble pairs the flowing grandeur of the traditional agbada with precision tailoring.',
   'images/products/agbada-3-piece/kaftan-agbada-1.jpeg', 2, false),

  ('groomsman-groomswear',  'GROOMSMAN/GROOMSWEAR',  'Coordinated wedding and groomsmen collections',
   'Make your wedding day unforgettable with our coordinated groomsmen and groomswear collections. We work closely with you to design matching ensembles that complement the wedding theme.',
   'images/products/groomswear/groomswear-1.jpeg', 3, false),

  ('rtw-collection',        'RTW COLLECTION',         'Ready-to-wear pieces available in showroom',
   'Explore our curated ready-to-wear collection — designed, cut, and finished to perfection so you can walk in and walk out in style.',
   'images/products/rtw-collection/womens-collection-1.jpeg', 4, false),

  ('casual',                'CASUAL',                 'Casual everyday wear for the modern professional',
   'Elevate your off-duty wardrobe with our casual collection. From perfectly tailored trousers to premium shorts, each piece is designed for the modern professional.',
   'images/products/casual/trousers-shorts-1.jpeg', 5, false),

  ('kaftan-masterpiece',    'KAFTAN (Masterpiece)',   'Premium statement kaftans for special occasions',
   'Our Masterpiece kaftans represent the pinnacle of Prince Orison craftsmanship. Each garment is a work of art — featuring hand-finished embellishments and premium fabrics.',
   NULL, 6, true),

  ('political-suit',        'POLITICAL SUIT',         'Refined political suiting for distinguished occasions',
   'Command presence with our distinguished political suit collection. Each suit is custom-made to your exact measurements, combining authoritative styling with supreme comfort.',
   NULL, 7, true),

  ('ankara-blends',         'ANKARA BLENDS',          'Contemporary ankara fusion pieces',
   'Experience the vibrant energy of ankara reimagined for the modern wardrobe. Our ankara blend pieces fuse bold African prints with contemporary cuts.',
   NULL, 8, true),

  ('jalabiya-custom',       'JALABIYA (Custom)',      'Custom jalabiya designs crafted to your specifications',
   'Experience the flowing elegance of our custom jalabiya collection. Each piece is crafted to your exact specifications.',
   NULL, 9, true),

  ('kaftan-jacket-3-piece', 'KAFTAN JACKET (3 Piece)', '3-piece sleeveless kaftan jacket sets',
   'Redefine traditional style with our sleeveless kaftan jacket three-piece sets. These structured ensembles layer a sleeveless jacket over a kaftan and trousers.',
   NULL, 10, true);
