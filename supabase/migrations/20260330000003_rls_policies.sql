-- ============================================================
-- Migration 003: Row Level Security Policies
-- Prince Orison Fashion House
-- ============================================================
-- Model: Single-owner site
--   - Public (anon) can READ published collections + products
--   - Only authenticated admin can INSERT/UPDATE/DELETE everything
--   - Enquiries: public can INSERT (submit form), only admin can read

-- Enable RLS on all tables
ALTER TABLE collections          ENABLE ROW LEVEL SECURITY;
ALTER TABLE products             ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_features     ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images       ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries            ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- ── collections ──────────────────────────────────────────────
-- Public can read published collections
CREATE POLICY "public_read_published_collections"
  ON collections FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Admin full access
CREATE POLICY "admin_all_collections"
  ON collections FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'princeorison1@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'princeorison1@gmail.com');

-- ── products ─────────────────────────────────────────────────
CREATE POLICY "public_read_published_products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (
    is_published = true
    AND EXISTS (
      SELECT 1 FROM collections c
      WHERE c.id = products.collection_id AND c.is_published = true
    )
  );

CREATE POLICY "admin_all_products"
  ON products FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'princeorison1@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'princeorison1@gmail.com');

-- ── product_features ─────────────────────────────────────────
CREATE POLICY "public_read_product_features"
  ON product_features FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_features.product_id AND p.is_published = true
    )
  );

CREATE POLICY "admin_all_product_features"
  ON product_features FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'princeorison1@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'princeorison1@gmail.com');

-- ── product_images ────────────────────────────────────────────
CREATE POLICY "public_read_product_images"
  ON product_images FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_images.product_id AND p.is_published = true
    )
  );

CREATE POLICY "admin_all_product_images"
  ON product_images FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'princeorison1@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'princeorison1@gmail.com');

-- ── enquiries ────────────────────────────────────────────────
-- Anyone can submit an enquiry (no auth required)
CREATE POLICY "public_insert_enquiries"
  ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admin can read/update/delete
CREATE POLICY "admin_all_enquiries"
  ON enquiries FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'princeorison1@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'princeorison1@gmail.com');

-- ── newsletter_subscribers ────────────────────────────────────
-- Anyone can subscribe
CREATE POLICY "public_subscribe_newsletter"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admin can read/manage
CREATE POLICY "admin_all_newsletter"
  ON newsletter_subscribers FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'princeorison1@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'princeorison1@gmail.com');
